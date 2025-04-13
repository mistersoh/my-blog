/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // 프로덕션 배포 시 S3에 적합하도록 이미지 최적화 비활성화
  images: {
    unoptimized: true,
  },
  // 후행 슬래시 사용 (깔끔한 URL 구조를 위해)
  trailingSlash: true,
  // 리액트 엄격 모드 활성화
  reactStrictMode: true,
  // MDX 패키지 트랜스파일
  transpilePackages: ["next-mdx-remote"],
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