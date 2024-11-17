import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import ProgressBar from "@ramonak/react-progress-bar"
import { useState } from 'react';
import { getUserEnrolledCourses } from '../../../services/operations/profileAPI';
import { useNavigate } from 'react-router-dom';

export const EnrolledCourses = () => {
    const navigate = useNavigate(); 
    const {token} = useSelector((state) => state.auth);
    const [enrolledCourses,setEnrolledCourses] = useState([]);
    const getEnrolledCourses = async () =>{
        try{    
            const response = await getUserEnrolledCourses(token);
            console.log("responce ..",response);
            setEnrolledCourses(response);
        }catch(error){
            console.log("enable TO FETCH COURSES");
        }
    }
    useEffect(() => {
        getEnrolledCourses();
    },[]);

  return (
    <div>
        <div className="text-3xl text-richblack-50">
            Entrolled Courses
        </div>
        {
            !enrolledCourses ? (<div className='spinner'>loading</div>)
            :
            !enrolledCourses.length ? (<p className="grid h-[10vh] w-full place-content-center text-richblack-5"
            >You have not enrolled for any course </p>)
            :
            (
            <div className="my-8 text-richblack-5">
                <div className="flex rounded-t-lg bg-richblack-500 ">
                    <p className="w-[45%] px-5 py-3">Course name</p>
                    <p className="w-1/4 px-2 py-3">Duration</p>
                    <p className="flex-1 px-2 py-3">Progress</p>
                    {/* {Cards share same data} */}
                    {
                        enrolledCourses.map((course,index) => (
                            <div key={index}
                            className={`flex items-center border border-richblack-700 `}>
                                <div className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
                                onClick={() => {
                                    navigate(
                                      `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                                    )
                                  }}>
                                    <img src={course.thumbnail}
                                    alt="course_img"
                                    className="h-14 w-14 rounded-lg object-cover" />
                                    <div className="flex max-w-xs flex-col gap-2">
                                        <p className="font-semibold">{course.courseName}</p>
                                        <p className="text-xs text-richblack-300">
                                        {course.courseDescription.length > 50
                                        ? `${course.courseDescription.slice(0, 50)}...`
                                        : course.courseDescription}</p>
                                    </div>
                                </div>
                                <div className="w-1/4 px-2 py-3">
                                    {course.totalDuration}
                                </div>
                                <div className="flex w-1/5 flex-col gap-2 px-2 py-3">
                                    <p>Progess: {course.progressPercentage || 0}%</p>
                                    <ProgressBar completed={course.progressPercentage || 0}
                                    height='8px'
                                    isLabelVisible={false}></ProgressBar>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            )
        }

    </div>
  )
}
