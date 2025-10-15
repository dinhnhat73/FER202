import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // File CSS tùy chỉnh nếu bạn có

// Import tất cả các component bài tập
import CounterComponent from './components/CounterComponent';
import LightSwitch from './components/LightSwitch';
import LoginForm from './components/LoginForm';
import SearchItem from './components/SearchItem';
import SearchAccount from './components/SearchAccount';
import RegisterForm from './components/RegisterForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Bài tập useState Hooks</h1>
      </header>
      
      <main className="container mt-4">
        {/* Bài tập 1: Bộ đếm */}
        <section className="mb-5">
          <h2>Bài 1: Bộ đếm đa năng</h2>
          <CounterComponent />
        </section>

        <hr />

        {/* Bài tập 2: Công tắc đèn */}
        <section className="my-5">
          <h2>Bài 2: Công tắc đèn</h2>
          <LightSwitch />
        </section>

        <hr />

        {/* Bài tập 3 & 4: Form Đăng nhập */}
        <section className="my-5">
          <h2>Bài 3 & 4: Form Đăng nhập</h2>
          <LoginForm />
        </section>

        <hr />

        {/* Bài tập 5: Lọc danh sách sản phẩm */}
        <section className="my-5">
          <h2>Bài 5: Lọc danh sách sản phẩm</h2>
          <SearchItem />
        </section>

        <hr />

        {/* Bài tập 6: Tìm kiếm tài khoản */}
        <section className="my-5">
          {/* Bài tập 6 được đặt trong một component riêng biệt, 
            nhưng để hiển thị trong App.js, chúng ta cần bao bọc nó 
            trong một div hoặc component container để có layout tốt hơn.
          */}
          <SearchAccount />
        </section>

        <hr />

        {/* Bài tập 7: Form Đăng ký */}
        <section className="my-5">
          <h2>Bài 7: Form Đăng ký</h2>
          <RegisterForm />
        </section>
      </main>
      
      <footer className="text-center mt-5 mb-3">
        <p>Hoàn thành bởi [Tên của bạn]</p>
      </footer>
    </div>
  );
}

export default App;