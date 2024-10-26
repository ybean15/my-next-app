// pages/api/download.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { spawn } from "child_process";
import path from "path";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { url } = req.body;

    if (!url) {
      res.status(400).json({ message: "URL이 필요합니다." });
      return;
    }

    // Python 스크립트를 실행하여 다운로드 처리
    const pythonProcess = spawn("python3", [path.join(process.cwd(), "scripts", "download.py"), url]);

    pythonProcess.stdout.on("data", (data) => {
      console.log(`stdout: ${data}`);
    });

    pythonProcess.stderr.on("data", (data) => {
      console.error(`stderr: ${data}`);
    });

    pythonProcess.on("close", (code) => {
      if (code === 0) {
        res.status(200).json({ message: "다운로드가 완료되었습니다." });
      } else {
        res.status(500).json({ message: "다운로드 중 오류가 발생했습니다." });
      }
    });
  } else {
    res.status(405).json({ message: "허용되지 않는 요청 방식입니다." });
  }
}
