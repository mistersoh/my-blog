# AWS S3 배포 스크립트 (캐시 처리 최적화)
# 실행하기 전에 AWS CLI가 설치되어 있고 설정이 완료되어 있어야 합니다.

# 여기에 S3 버킷 이름을 입력하세요
$S3_BUCKET = "mypage.mistersoh.me"

# 빌드 실행
Write-Host "빌드를 시작합니다..." -ForegroundColor Green
npm run build

# 빌드 성공 여부 확인
if ($LASTEXITCODE -ne 0) {
    Write-Host "빌드에 실패했습니다. 오류를 확인하세요." -ForegroundColor Red
    exit 1
}

Write-Host "빌드가 완료되었습니다. S3에 배포합니다..." -ForegroundColor Green

# HTML 파일 배포 (캐시 방지 설정)
Write-Host "HTML 파일을 배포합니다 (캐시 방지)..." -ForegroundColor Cyan
aws s3 sync ./out s3://$S3_BUCKET --delete --exclude "*" --include "*.html" --cache-control "no-cache,max-age=0" --content-type "text/html; charset=utf-8"

# 정적 에셋 배포 (장기 캐시 설정)
Write-Host "정적 에셋을 배포합니다 (장기 캐시)..." -ForegroundColor Cyan
aws s3 sync ./out s3://$S3_BUCKET --delete --exclude "*.html" --cache-control "public,max-age=31536000"

# 결과 확인
if ($LASTEXITCODE -ne 0) {
    Write-Host "S3 배포에 실패했습니다. AWS 설정과 권한을 확인하세요." -ForegroundColor Red
    exit 1
}

Write-Host "배포가 완료되었습니다!" -ForegroundColor Green
Write-Host "웹사이트: http://$S3_BUCKET.s3-website.ap-northeast-2.amazonaws.com" -ForegroundColor Cyan
Write-Host "브라우저 캐시를 지우고 웹사이트를 확인하세요 (Ctrl+F5)" -ForegroundColor Yellow 