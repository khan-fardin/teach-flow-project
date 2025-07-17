import React from 'react';
import { Helmet } from 'react-helmet-async';
import Banner from '../../Components/HomePageCompnents/Banner';
import Collaborator from '../../Components/HomePageCompnents/Collaborator';
import FeaturedClasses from '../../Components/HomePageCompnents/FeaturedClasses';
import FeedbackSection from '../../Components/HomePageCompnents/FeedbackSection';
import WebsiteStats from '../../Components/HomePageCompnents/WebsiteStats';
import InspireTeachers from '../../Components/HomePageCompnents/InspireTeachers';
import ExtraSection from '../../Components/HomePageCompnents/ExtraSection';

const Home = () => {
    return (
        <div className='space-y-5'>
            <Helmet>
                <title>Home</title>
            </Helmet>
            <Banner/>
            <Collaborator/>
            <FeaturedClasses/>
            <FeedbackSection/>
            <WebsiteStats/>
            <InspireTeachers/>
            <ExtraSection/>
        </div>
    );
};

export default Home;