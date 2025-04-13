const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// 슬러그 인코딩 함수
const encodeSlug = (value) =>
  value
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^a-z0-9가-힣-]/g, "")
    .slice(0, 100);

// 질문 함수
const ask = (question) => {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
};

// 유효한 슬러그 선택
const pickValidSlug = async (value) => {
  const slug = encodeSlug(value);
  const existingPosts = fs.existsSync(path.join(process.cwd(), "content/blog", slug));
  
  if (existingPosts) {
    console.log(`${slug} 경로가 이미 존재합니다.`);
    const newSlug = await ask("포스트 경로: ");
    return pickValidSlug(newSlug);
  }

  return slug;
};

// 메인 함수
async function main() {
  try {
    // 포스트 정보 수집
    const title = await ask("제목: ");
    if (!title) {
      console.log("제목은 필수 입력 사항입니다.");
      rl.close();
      return;
    }

    const slug = await ask("포스트 경로 (미입력시 인코딩된 제목으로 생성): ");
    const description = await ask("설명: ");
    const tags = await ask("태그 (쉼표로 구분): ");
    const author = await ask("작성자: ");

    if (!author) {
      console.log("작성자는 필수 입력 사항입니다.");
      rl.close();
      return;
    }

    // 포스트 정보 객체
    const postInfo = {
      title,
      description,
      date: new Date().toISOString().split('T')[0],
      tags: tags && tags.length > 0
        ? tags.split(",").map(tag => tag.trim())
        : [],
      author
    };

    // 마크다운 프론트매터 생성
    let post = "---\n";
    
    // 일반 필드 처리
    for (const [key, value] of Object.entries(postInfo)) {
      if (key !== 'tags' && value !== undefined && value !== '') {
        post += `${key}: ${value}\n`;
      }
    }
    
    // 태그 배열 처리
    if (postInfo.tags && postInfo.tags.length > 0) {
      post += "tags:\n";
      postInfo.tags.forEach(tag => {
        post += `  - ${tag}\n`;
      });
    }
    
    post += "---\n\n";
    post += `# ${title}\n\n`;

    // 포스트 파일 생성
    const finalSlug = await pickValidSlug(slug || encodeSlug(title));
    const postDir = path.join(process.cwd(), "content/blog", finalSlug);
    const postPath = path.join(postDir, "index.md");

    if (!fs.existsSync(postDir)) {
      fs.mkdirSync(postDir, { recursive: true });
    }

    fs.writeFileSync(postPath, post, 'utf-8');
    console.log(`"${finalSlug}" 포스트가 생성되었습니다.`);
  } catch (error) {
    console.error("포스트 생성 중 오류가 발생했습니다:", error);
  } finally {
    rl.close();
  }
}

main(); 