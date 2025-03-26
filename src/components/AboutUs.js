
import React, { useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const AboutUs = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoSize, setVideoSize] = useState('normal');

  const handleTogglePlayPause = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSize = (size) => setVideoSize(size);

  const getVideoSize = () => {
    switch (videoSize) {
      case 'small':
        return { width: '320px', height: '180px' };
      case 'big':
        return { width: '92%', height: 'auto' }; // Keeps it contained within the div
      default:
        return { width: '480px', height: '300px' }; // Matches the size in the picture
    }
  };

  return (
    <div className="container mt-2 f">
      <div className="card p-4 shadow" id='a-b' style={{ borderColor: '#1C478E', maxWidth: '800px' }}>
        <h2 className="mb-4" style={{ textAlign: 'left' }}>DCX Developer Directory!</h2>
        
        <div className="row">
          <div className="col-md-12">
            <h5 style={{ color: '#0000ff', textAlign: 'left' }}>Who Are We?</h5>
            <p style={{ textAlign: 'left' }}>
              We are a fictional website and service that lists top web developers around the world.
              Search and browse developers on our website, absolutely FREE!
            </p>
            
            <h5 style={{ color: '#0000ff', textAlign: 'left' }}>What Skills Do Our Developers Have?</h5>
            <p style={{ textAlign: 'left' }}>
              Our listed fictional web developers’ skills range from graphic design with Photoshop, Illustrator,
              and Fireworks to modern languages like HTML5, XHTML, and XML to programming languages such as
              JavaScript, PHP, Python, and ASP.
            </p>
          </div>
          
          <div className="col-md-11">
            <video
              ref={videoRef}
              controls
              style={getVideoSize()}
              src="/ad.mp4"
            />
            <div className="d-flex justify-content-start mt-3">
              <button
                className="btn m-1"
                onClick={handleTogglePlayPause}
                style={{
                  backgroundColor: '#d3d3d3',
                  color: '#000',
                  border: '1px solid #a0a0a0',
                  padding: '5px 15px',
                  fontSize: '14px'
                }}
              >
                Play/Pause
              </button>
              <button
                className="btn m-1"
                onClick={() => handleSize('small')}
                style={{
                  backgroundColor: '#d3d3d3',
                  color: '#000',
                  border: '1px solid #a0a0a0',
                  padding: '5px 15px',
                  fontSize: '14px'
                }}
              >
                Small
              </button>
              <button
                className="btn m-1"
                onClick={() => handleSize('normal')}
                style={{
                  backgroundColor: '#d3d3d3',
                  color: '#000',
                  border: '1px solid #a0a0a0',
                  padding: '5px 15px',
                  fontSize: '14px'
                }}
              >
                Normal
              </button>
              <button
                className="btn m-1"
                onClick={() => handleSize('big')}
                style={{
                  backgroundColor: '#d3d3d3',
                  color: '#000',
                  border: '1px solid #a0a0a0',
                  padding: '5px 15px',
                  fontSize: '14px'
                }}
              >
                Big
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs