/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // 프로덕션 배포 시 S3에 적합하도록 이미지 최적화 비활성화
  images: {
    unoptimized: true,
  },
  // 폴더 기반 라우팅을 위한 설정 - 슬래시 추가 비활성화 (우리는 직접 index.html 사용)
  trailingSlash: false,
  // 정적 사이트 생성을 위해 마크다운 파일 트랜스파일링
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    });
    return config;
  },
};

module.exports = nextConfig; 