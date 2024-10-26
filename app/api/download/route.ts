// app/api/download/route.ts
import { NextRequest, NextResponse } from "next/server";
import { spawn } from "child_process";
import path from "path";

export async function POST(req: NextRequest) {
  const { url } = await req.json();

  if (!url) {
    return NextResponse.json({ message: "URL이 필요합니다." }, { status: 400 });
  }

  // Python 스크립트를 실행하여 진행 상태 수집
  const pythonProcess = spawn("python3", [path.join(process.cwd(), "scripts", "download.py"), url]);

  pythonProcess.stdout.on("data", (data) => {
    // 진행률이 포함된 데이터를 출력
    console.log(`Progress: ${data}`);
    // 여기서 데이터를 클라이언트로 보낼 수 있도록 저장하거나 웹소켓에 연결할 수 있습니다.
  });

  return new Promise((resolve) => {
    pythonProcess.on("close", (code) => {
      if (code === 0) {
        resolve(NextResponse.json({ message: "다운로드 완료", filePath: "/downloaded_video.mp4" }));
      } else {
        resolve(NextResponse.json({ message: "다운로드 중 오류 발생" }, { status: 500 }));
      }
    });
  });
}
