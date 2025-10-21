import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Import các component bài tập
import CounterComponent from './components/CounterComponent';
import LightSwitch from './components/LightSwitch';
import LoginForm_Bai3 from './components/LoginForm_Bai3'; // Import bài 3
import LoginForm_Bai4 from './components/LoginForm_Bai4'; // Import bài 4
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
        {/* ... (Các bài tập 1 và 2 giữ nguyên) ... */}
        <section className="mb-5">
          <h2>Bài 1: Bộ đếm đa năng</h2>
          <CounterComponent />
        </section>
        <hr/>
        <section className="my-5">
          <h2>Bài 2: Công tắc đèn</h2>
          <LightSwitch />
        </section>
        <hr/>

        {/* Bài tập 3: Form Đăng nhập (State riêng lẻ) */}
        <section className="my-5">
          <h2>Bài 3: Form Đăng nhập (State riêng lẻ)</h2>
          <LoginForm_Bai3 />
        </section>

        <hr />

        {/* Bài tập 4: Form Đăng nhập (State Object) */}
        <section className="my-5">
          <h2>Bài 4: Form Đăng nhập (State Object)</h2>
          <LoginForm_Bai4 />
        </section>

        <hr />
        
        {/* ... (Các bài tập còn lại giữ nguyên) ... */}
        <section className="my-5">
          <h2>Bài 5: Lọc danh sách sản phẩm</h2>
          <SearchItem />
        </section>
        <hr/>
        <section className="my-5">
            <h2>Bài 6: Tìm kiếm tài khoản</h2>
            <SearchAccount />
        </section>
        <hr/>
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