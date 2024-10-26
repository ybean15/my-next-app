// app/page.tsx
"use client";

import React, { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState(""); // URL 입력 상태
  const [downloadLink, setDownloadLink] = useState<string | null>(null); // 다운로드 링크 상태
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태

  const handleDownload = async () => {
    setIsLoading(true); // 로딩 시작
    setDownloadLink(null); // 기존 링크 초기화

    try {
      const response = await fetch("/api/download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      if (response.ok) {
        const data = await response.json();
        setDownloadLink(data.filePath); // 다운로드 완료 시 링크 설정
      } else {
        alert("다운로드 요청에 실패했습니다.");
      }
    } catch (error) {
      console.error("다운로드 중 오류 발생:", error);
      alert("다운로드 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false); // 로딩 상태 종료
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center text-center">
      <h1 className="text-3xl font-semibold text-gray-800 mb-8">
        유튜브 숏츠 다운로드
      </h1>
      <input
        type="text"
        placeholder="유튜브 숏츠 URL 입력"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="border border-gray-300 rounded px-4 py-2 w-64 text-center mb-4 placeholder-gray-500 text-black" // 텍스트 검정색
      />
      <button
        onClick={handleDownload}
        className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition duration-300"
      >
        다운로드
      </button>

      {/* 로딩 표시 */}
      {isLoading && (
        <div className="mt-4">
          <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 mt-2">다운로드 중...</p>
        </div>
      )}

      {/* 다운로드 완료 후 링크 표시 */}
      {downloadLink && !isLoading && (
        <a
          href={downloadLink}
          download
          className="mt-4 text-blue-600 font-medium hover:underline hover:text-blue-700 transition duration-300"
        >
          다운로드 받은 파일 저장하기
        </a>
      )}
    </div>
  );
}
