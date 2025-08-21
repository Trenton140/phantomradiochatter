
import React from 'react';
import { FaFacebook, FaInstagram, FaYoutube, FaEnvelope } from 'react-icons/fa';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

function Home() {
  // Place the group photo in public/photos/group.jpg
  const [modalOpen, setModalOpen] = React.useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  return (
    <div className="page">
      <h1>Phantom Radio Chatter</h1>
      <div style={{width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '1em'}}>
        <img
          src={process.env.PUBLIC_URL + '/photos/group.jpg'}
          alt="Band group"
          style={{width: '100%', maxWidth: '900px', borderRadius: 12, border: '2.5px solid #b30000', cursor: 'pointer', objectFit: 'contain', boxShadow: '0 2px 16px rgba(179,0,0,0.10)'}}
          onClick={openModal}
        />
      </div>
  <p>Welcome to the official band website!</p>
  <p style={{color: '#b30000', fontWeight: 'bold', marginTop: '1em'}}>Toronto, Ontario, Canada</p>
      {modalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <img src={process.env.PUBLIC_URL + '/photos/group.jpg'} alt="Band group" style={{maxWidth: '90vw', maxHeight: '80vh', borderRadius: '10px'}} />
            <div style={{color: '#b30000', fontWeight: '700', fontSize: '1.2em', marginBottom: '1em'}}>Phantom Radio Chatter</div>
            <button className="modal-close" onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

function BandMembers() {
  // Place member photos in public/photos/member1.jpg, member2.jpg, member3.jpg
  const members = [
    {
      name: 'Michael Bennett Leroux',
      role: 'Vocals & Guitar',
      bio: 'A short writeup about Michael Bennett Leroux. Passionate about music and the band.',
      photo: 'Michael Bennett Leroux.jpg',
    },
    {
      name: 'Owen McLaughlin',
      role: 'Bass Guitar',
      bio: 'A short writeup about Owen McLaughlin. Loves groovy bass lines and live shows.',
      photo: 'Owen McLaughlin.jpg',
    },
    {
      name: 'Mark Duch Koetsier',
      role: 'Drums',
      bio: 'A short writeup about Mark Duch Koetsier. Keeps the beat and brings the energy.',
      photo: 'Mark Duch Koetsier.jpg',
    },
  ];
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalImg, setModalImg] = React.useState(null);
  const [modalAlt, setModalAlt] = React.useState('');

  const openModal = (img, alt) => {
    setModalImg(img);
    setModalAlt(alt);
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);

  return (
    <div className="page">
      <h2>Band Members</h2>
      <div style={{marginTop: '2em'}}>
        {members.map((m, idx) => (
          <div key={idx} style={{marginBottom: '2.5em', textAlign: 'center'}}>
            <img
              src={process.env.PUBLIC_URL + '/photos/' + m.photo}
              alt={m.name}
              style={{
                width: '100%',
                maxWidth: '700px',
                height: 'auto',
                borderRadius: '12px',
                border: '2.5px solid #b30000',
                boxShadow: '0 2px 16px rgba(179,0,0,0.10)',
                marginBottom: '1em',
                cursor: 'pointer',
                objectFit: 'contain',
                background: '#fff'
              }}
              onClick={() => openModal(process.env.PUBLIC_URL + '/photos/' + m.photo, m.name)}
            />
            <h3 style={{color: '#b30000', marginBottom: '0.2em'}}>{m.name}</h3>
            <strong style={{color: '#222'}}>{m.role}</strong>
            <p>{m.bio}</p>
          </div>
        ))}
      </div>
      {modalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <img src={modalImg} alt={modalAlt} style={{maxWidth: '90vw', maxHeight: '80vh', borderRadius: '10px'}} />
            <div style={{color: '#b30000', fontWeight: '700', fontSize: '1.2em', marginBottom: '1em'}}>{modalAlt}</div>
            <button className="modal-close" onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

function TourDates() {
  return (
    <div className="page">
      <h2>Tour Dates</h2>
      <p>Upcoming shows will be listed here.</p>
    </div>
  );
}

function Watch() {
  return (
    <div className="page">
      <h2>Watch</h2>
      <a href="https://www.youtube.com/@PhantomRadioChatter" target="_blank" rel="noopener noreferrer">YouTube Channel</a>
    </div>
  );
}

function Listen() {
  return (
    <div className="page">
      <h2>Listen</h2>
      <p>Links to music platforms coming soon.</p>
    </div>
  );
}

function Photos() {
  // List all photo files from public/photos
  const photoFiles = [
    'group.jpg',
    'Mark Duch Koetsier.jpg',
    'Michael Bennett Leroux.jpg',
    'Owen McLaughlin.jpg',
  ];

  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalIdx, setModalIdx] = React.useState(0);
  const [showArrows, setShowArrows] = React.useState(true);
  const [fade, setFade] = React.useState(false);
  const arrowTimeout = React.useRef(null);

  const openModal = idx => {
    setModalIdx(idx);
    setModalOpen(true);
    setShowArrows(true);
  };
  const closeModal = () => setModalOpen(false);
  const prevPhoto = () => {
    setFade(true);
    setTimeout(() => {
      setModalIdx(idx => (idx === 0 ? photoFiles.length - 1 : idx - 1));
      setFade(false);
    }, 250);
  };
  const nextPhoto = () => {
    setFade(true);
    setTimeout(() => {
      setModalIdx(idx => (idx === photoFiles.length - 1 ? 0 : idx + 1));
      setFade(false);
    }, 250);
  };

  React.useEffect(() => {
    if (!modalOpen) return;
    const handleKey = e => {
      if (e.key === 'ArrowLeft') prevPhoto();
      if (e.key === 'ArrowRight') nextPhoto();
      if (e.key === 'Escape') closeModal();
      setShowArrows(true);
      if (arrowTimeout.current) clearTimeout(arrowTimeout.current);
      arrowTimeout.current = setTimeout(() => setShowArrows(false), 1000);
    };
    const handleMouseMove = () => {
      setShowArrows(true);
      if (arrowTimeout.current) clearTimeout(arrowTimeout.current);
      arrowTimeout.current = setTimeout(() => setShowArrows(false), 1000);
    };
    const handleWheel = e => {
      if (e.deltaY < 0) prevPhoto();
      if (e.deltaY > 0) nextPhoto();
      setShowArrows(true);
      if (arrowTimeout.current) clearTimeout(arrowTimeout.current);
      arrowTimeout.current = setTimeout(() => setShowArrows(false), 1000);
    };
    window.addEventListener('keydown', handleKey);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('wheel', handleWheel);
    return () => {
      window.removeEventListener('keydown', handleKey);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('wheel', handleWheel);
      if (arrowTimeout.current) clearTimeout(arrowTimeout.current);
    };
  }, [modalOpen]);

  return (
    <div className="page">
      <h2>Photos</h2>
      <div className="photos-grid">
        {photoFiles.map((file, idx) => (
          <div className="photo-item" key={idx} style={{cursor: 'pointer'}} onClick={() => openModal(idx)}>
            <img src={process.env.PUBLIC_URL + '/photos/' + file} alt={`Band photo ${idx + 1}`} style={{objectFit: 'cover', width: '100%', height: '100%'}} />
          </div>
        ))}
      </div>
      {modalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{position: 'relative'}}>
            <div style={{position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              {showArrows && (
                <span onClick={prevPhoto} className="modal-arrow-box" style={{left: 0}}>
                  <span className="modal-arrow">&lt;</span>
                </span>
              )}
              <img 
                src={process.env.PUBLIC_URL + '/photos/' + photoFiles[modalIdx]} 
                alt={`Band photo ${modalIdx + 1}`} 
                className={`modal-photo${fade ? ' fade-out' : ''}`}
                style={{maxWidth: '90vw', maxHeight: '80vh', borderRadius: '10px', marginBottom: '1em'}} 
              />
              {showArrows && (
                <span onClick={nextPhoto} className="modal-arrow-box" style={{right: 0}}>
                  <span className="modal-arrow">&gt;</span>
                </span>
              )}
            </div>
            <div style={{display: 'flex', justifyContent: 'center', marginTop: '1em'}}>
              <button className="modal-close" onClick={closeModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Blog() {
  return (
    <div className="page">
      <h2>Blog</h2>
      <p>Latest news and updates.</p>
    </div>
  );
}

function SocialLinks() {
  return (
    <div className="social-links">
      <a href="https://www.facebook.com/profile.php?id=61578310437399" target="_blank" rel="noopener noreferrer" title="Facebook" style={{ margin: '0 10px', color: '#b30000', fontSize: '2em' }}>
        <FaFacebook />
      </a>
      <a href="https://www.instagram.com/phantomradiochatterband/" target="_blank" rel="noopener noreferrer" title="Instagram" style={{ margin: '0 10px', color: '#b30000', fontSize: '2em' }}>
        <FaInstagram />
      </a>
      <a href="https://www.youtube.com/@PhantomRadioChatter" target="_blank" rel="noopener noreferrer" title="YouTube" style={{ margin: '0 10px', color: '#b30000', fontSize: '2em' }}>
        <FaYoutube />
      </a>
      <a href="mailto:phantomradiochatter@gmail.com" title="Email" style={{ margin: '0 10px', color: '#b30000', fontSize: '2em' }}>
        <FaEnvelope />
      </a>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="navbar" style={{flexDirection: 'column', alignItems: 'center'}}>
        <div style={{width: '100%', textAlign: 'center', fontWeight: 'bold', fontSize: '2.2em', color: '#b30000', letterSpacing: '2px', marginBottom: '0.5em'}}>
          <Link to="/" style={{color: '#b30000', textDecoration: 'none', fontWeight: 'bold'}}>Phantom Radio Chatter</Link>
        </div>
        <div style={{display: 'flex', gap: '2em', justifyContent: 'center', width: '100%'}}>
          <Link to="/">Home</Link>
          <Link to="/band-members">Band Members</Link>
          <Link to="/tour-dates">Tour Dates</Link>
          <Link to="/watch">Watch</Link>
          <Link to="/listen">Listen</Link>
          <Link to="/photos">Photos</Link>
          <Link to="/blog">Blog</Link>
        </div>
      </div>
      <SocialLinks />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/band-members" element={<BandMembers />} />
        <Route path="/tour-dates" element={<TourDates />} />
        <Route path="/watch" element={<Watch />} />
        <Route path="/listen" element={<Listen />} />
        <Route path="/photos" element={<Photos />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
    </Router>
  );
}

export default App;
