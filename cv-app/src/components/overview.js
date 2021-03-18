import '../styles/overview.scss';

function Overview() {
  return (
    <div className='CV-overview'>
      <div className='titleBox'>
        <h1 className='name'>
          <span className='first-name'>Nicolas</span>
          <span> </span>
          <span className='last-name'>Lunardi</span>
        </h1>
        <h2 className='title'>Front-end Developer</h2>
        <p className='e-mail'>
          <span>E-Mail: </span>
           Jiasong214@gmail.com
        </p>
        <p className='number'>
          <span>Phone: </span>
          0413 173 676
        </p>
      </div>
      <div className='mainBox'>
        <p className='summary'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel sem et nibh sodales placerat. Donec in sapien nec lacus rutrum dapibus ac nec metus. Donec arcu augue, venenatis eget fermentum sed, elementum nec quam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer eget gravida nibh.
        </p>
        <div className='experience'>
          <h1>Experience</h1>
          <ul className='exprienceList'>
            <li>
              <p className='period'>2019.09 - present</p>
              <div className='right'>
                <h2 className='title'>Front-end Developer</h2>
                <h3 className='companyName'>Samsung</h3>
                <ul className='jobDescription'>
                  <li>blabla</li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className='skills'>
          <h1>Skills</h1>
          <ul className='skillsList'>
            <li>
              <div></div>
              <div className='right'>
                <ul>
                  <li>Javascript</li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className='education'>
          <h1>Education</h1>
          <ul className='educationList'>
            <li>
              <p className='period'>2019.09 - present</p>
              <div className='right'>
                <h2 className='major'>Front-end Developer</h2>
                <ul className='majorDescription'>
                  <li>blabla</li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Overview;