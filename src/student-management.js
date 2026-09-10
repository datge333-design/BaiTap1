class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  introduce() {
    console.log(`Xin chào, tôi tên là ${this.name}, ${this.age} tuổi.`);
  }
}

class Student extends Person {
  constructor(name, age, scores = []) { // "nếu không truyền scores thì tự hiểu là mảng rỗng
    super(name, age); 
    this.scores = scores;
  }

  getAverageScore() {
    if (this.scores.length === 0) return 0;
    const total = this.scores.reduce((sum, score) => sum + score, 0); // reduce cộng dồn vào sum, bắt đầu từ vị trí 0
    return total / this.scores.length;
  }

  displayInfo() {
    console.log(`--- Thông tin sinh viên ---`);
    console.log(`Tên: ${this.name}`);
    console.log(`Tuổi: ${this.age}`);
    console.log(`Điểm: ${this.scores.join(', ')}`);
    console.log(`Điểm TB: ${this.getAverageScore().toFixed(2)}`);
  }
}

function createScores(...scores) { // "...scores" (Rest Parameter) gom tất cả tham số truyền vào thành 1 mảng
  return scores;
}

function getPassingScores(scores, threshold = 5) {
  return scores.filter(score => score >= threshold); // filter trả về mảng MỚI chỉ chứa phần tử thỏa điều kiện
}

function applyBonus(scores, bonus = 0.5) {
  return scores.map(score => score + bonus); // map trả về mảng MỚI với từng phần tử đã bị biến đổi
}

function calculateTotal(scores) {
  return scores.reduce((sum, score) => sum + score, 0);
}

function evaluatePerformance(averageScore) {
  return new Promise((resolve) => { // Promise đại diện cho 1 tác vụ sẽ hoàn thành SAU (bất đồng bộ), không phải ngay lập tức
    setTimeout(() => {
      if (averageScore >= 8) {
        resolve('Excellent Student'); // resolve() = trả kết quả về khi Promise hoàn thành
      } else {
        resolve('Need Improvement');
      }
    }, 1000);
  });
}

async function checkStudent(student) { // "async" cho phép dùng "await" bên trong hàm này
  const avg = student.getAverageScore();
  const result = await evaluatePerformance(avg); // "await" khiến code DỪNG LẠI chờ Promise xong rồi mới chạy tiếp
  console.log(`Đánh giá của ${student.name}: ${result}`);
}

console.log('===== BẮT ĐẦU CHƯƠNG TRÌNH =====\n');

const scores1 = createScores(8, 9, 10);
console.log('Mảng điểm tạo từ Rest Parameter:', scores1);

const student1 = new Student('Lan', 21, scores1);

student1.introduce();

const { name, age } = student1; // Destructuring: bóc tách 2 thuộc tính từ object ra thành biến riêng, thay vì viết student1.name, student1.age
console.log(`\nDestructuring -> Tên: ${name}, Tuổi: ${age}`);

const newScores = [7, 10];
student1.scores = [...student1.scores, ...newScores]; // Spread Operator: "trải" 2 mảng ra rồi gộp thành 1 mảng phẳng duy nhất
console.log('\nSau khi gộp điểm mới (Spread Operator):', student1.scores);

console.log('');
student1.displayInfo();

console.log('\n--- Xử lý mảng điểm bằng filter/map/reduce ---');
console.log('Điểm đạt (>=5):', getPassingScores(student1.scores));
console.log('Điểm cộng thêm bonus:', applyBonus(student1.scores));
console.log('Tổng điểm:', calculateTotal(student1.scores));

console.log('\n--- Đánh giá học lực (bất đồng bộ) ---');
checkStudent(student1); // hàm này chạy bất đồng bộ, nên kết quả của nó sẽ IN RA SAU CÙNG dù được gọi ở giữa code

const student2 = new Student('Minh', 20, createScores(4, 5, 6));
student2.introduce();
student2.displayInfo();
checkStudent(student2);