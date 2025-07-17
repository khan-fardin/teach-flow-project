import React from 'react';
import Marquee from 'react-fast-marquee';
import img1 from '../../assets/collaborators/collab1.png';
import img2 from '../../assets/collaborators/collab2.jpg';
import img3 from '../../assets/collaborators/collab3.png';
import img4 from '../../assets/collaborators/collab4.jpg';
import img5 from '../../assets/collaborators/collab5.jpg';

const Collaborator = () => {
  const logos = [img1, img2, img3, img4, img5];

  return (
    <section className="py-12 bg-base-200">
      <div className="max-w-6xl mx-auto text-center mb-6">
        <h2 className="text-3xl font-bold text-primary">Our Collaborators</h2>
        <p className="text-base-content/70 mt-2">
          Proudly working with the following partners and organizations
        </p>
      </div>

      <Marquee speed={40} gradient={false} pauseOnHover={true}>
        {logos.map((logo, idx) => (
          <div key={idx} className="mx-10">
            <img
              src={logo}
              alt={`Collaborator ${idx + 1}`}
              className="w-[120px] h-[80px] object-contain rounded-xl shadow"
            />
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export default Collaborator;
