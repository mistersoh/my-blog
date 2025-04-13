# 마크다운 기반 정적 웹사이트

이 프로젝트는 마크다운 파일을 사용하여 정적 웹사이트를 생성하는 Next.js 애플리케이션입니다. AWS S3에 호스팅되며, GitHub 저장소에 푸시할 때 자동으로 배포되는 CI/CD 파이프라인이 구성되어 있습니다.

## 주요 기능

- 마크다운 파일 기반 콘텐츠 관리
- 블로그 게시물 및 이력서 표시
- AWS S3에 정적 호스팅
- GitHub Actions를 사용한 CI/CD 파이프라인
- PR 미리보기 환경 자동 배포
- 블로그 포스트 수정일 자동 업데이트

## 기술 스택

- [Next.js](https://nextjs.org/) - React 프레임워크
- [Tailwind CSS](https://tailwindcss.com/) - 스타일링
- [Gray Matter](https://github.com/jonschlinkert/gray-matter) - Markdown 프론트매터 파싱
- [Remark](https://github.com/remarkjs/remark) - Markdown 처리

## 로컬 개발 시작하기

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

이후 브라우저에서 [http://localhost:3000](http://localhost:3000)에 접속하여 웹사이트를 확인할 수 있습니다.

## 콘텐츠 구조

```
content/
├── blog/        # 블로그 게시물 (.md 파일)
└── resume/      # 이력서 (.md 파일)
```

## 마크다운 파일 작성 방법

마크다운 파일은 다음과 같은 형식으로 작성합니다:

```markdown
---
title: '제목'
date: '2023-01-01'
description: '설명'
---

# 마크다운 내용
```

프론트매터(---로 둘러싸인 부분)에 메타데이터를 작성하고, 그 아래에 마크다운 콘텐츠를 작성합니다.

## GitHub 워크플로우

이 프로젝트는 다음과 같은 GitHub Actions 워크플로우를 사용합니다:

### 1. 메인 브랜치 배포 (`deploy-prebuilt.yml`)
메인 브랜치로 푸시될 때 빌드 결과를 AWS S3에 배포합니다.

### 2. 블로그 포스트 날짜 업데이트 (`update-date.yml`)
PR에서 블로그 포스트가 수정될 때 자동으로 수정일을 업데이트합니다.

### 3. PR 미리보기 환경 (`deploy-preview.yml`)
PR이 생성되거나 업데이트될 때 미리보기 환경을 자동으로 배포합니다.

## PR 작성 가이드

PR 작성 시 `.github/pull_request_template.md` 템플릿을 따라 작성해주세요. 템플릿에는 다음과 같은 정보를 포함해야 합니다:

- 변경 유형 (블로그 포스트 추가/수정, 기능 개선/추가, 버그 수정 등)
- 변경 내용 및 변경 배경
- 관련 이슈
- 확인 사항

## 배포 설정

### GitHub Secrets 설정

GitHub 저장소에 다음 secrets를 설정해야 합니다:

- `AWS_ACCESS_KEY_ID`: AWS 액세스 키 ID
- `AWS_SECRET_ACCESS_KEY`: AWS 시크릿 액세스 키
- `AWS_S3_BUCKET`: 정적 웹사이트를 호스팅할 S3 버킷 이름
- `AWS_PREVIEW_BUCKET_PREFIX`: PR 미리보기를 위한 S3 버킷 접두사
- `CLOUDFRONT_DISTRIBUTION_ID` (선택적): CloudFront 배포 ID (CDN 사용 시)

### AWS S3 버킷 설정

1. AWS S3 버킷을 생성하고 정적 웹사이트 호스팅을 활성화합니다.
2. 다음 버킷 정책을 설정하여 공개 액세스를 허용합니다:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::YOUR_BUCKET_NAME/*"
    }
  ]
}
```

## 라이센스

이 프로젝트는 MIT 라이센스에 따라 라이센스가 부여됩니다. 