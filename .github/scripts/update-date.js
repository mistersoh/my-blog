const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// 변경된 파일 목록 처리
const changedFiles = process.argv[2] ? process.argv[2].split('\n') : [];

// 블로그 마크다운 파일만 필터링
const mdFiles = changedFiles.filter(file => {
  return file.startsWith('content/blog/') && (file.endsWith('.md') || file.endsWith('.mdx'));
});

console.log('변경된 마크다운 파일: ', mdFiles);

// 각 파일 처리
mdFiles.forEach(filePath => {
  try {
    // 파일 내용 읽기
    const fullPath = path.join(process.cwd(), filePath);
    const fileContent = fs.readFileSync(fullPath, 'utf8');
    
    // front matter 파싱
    const { data, content } = matter(fileContent);
    
    // 날짜 정보 업데이트
    const currentDate = new Date().toISOString();
    
    if (!data.date) {
      // 날짜 정보가 없는 경우 새로 생성
      data.date = {
        posted: currentDate,
        modified: currentDate
      };
    } else if (typeof data.date === 'string') {
      // 단일 문자열 날짜가 있는 경우 객체로 변환
      const posted = data.date;
      data.date = {
        posted,
        modified: currentDate
      };
    } else if (typeof data.date === 'object') {
      // 이미 객체 형태인 경우 수정일만 업데이트
      data.date.modified = currentDate;
    }
    
    // 업데이트된 front matter로 파일 다시 생성
    const updatedFileContent = matter.stringify(content, data);
    fs.writeFileSync(fullPath, updatedFileContent);
    
    console.log(`${filePath} 파일의 날짜 정보가 업데이트되었습니다.`);
  } catch (error) {
    console.error(`${filePath} 파일 처리 중 오류 발생:`, error);
  }
}); 