// app/api/download/route.ts
import { NextRequest, NextResponse } from "next/server";
import { spawn } from "child_process";
import path from "path";

export async function POST(req: NextRequest): Promise<Response> {
  const { url } = await req.json();

  if (!url) {
    return NextResponse.json({ message: "URL이 필요합니다." }, { status: 400 });
  }

  const pythonProcess = spawn("python3", [path.join(process.cwd(), "scripts", "download.py"), url]);

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
