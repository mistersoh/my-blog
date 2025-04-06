/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // 프로덕션 배포 시 S3에 적합하도록 이미지 최적화 비활성화
  images: {
    unoptimized: true,
  },
  // 명시적 파일 경로 사용을 위해 후행 슬래시 비활성화
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