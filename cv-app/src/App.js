import Overview from './components/overview';
import './styles/app.scss';

function App() {
  const onSubmitForm = (e) => {
    e.preventDefault();
    console.log(e)
  }
  return (
    <div className="App">
      <Overview/>
      <div className='form'>
        <h1>Your Information</h1>
        <form className='title-form' onSubmit={function(e){onSubmitForm(e)}}>
          <input placeholder='First Name'></input>
          <input placeholder='Last Name'></input>
          <input placeholder='Job Title'></input>
          <input placeholder='E-mail'></input>
          <input placeholder='Phone'></input>
          <button type='submit'>Enter</button>
        </form>
      </div>
    </div>
  );
}

export default App;
