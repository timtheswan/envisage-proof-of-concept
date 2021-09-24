import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from 'vuex-persist';

import coursesData from './data/coursesData.js'

Vue.use(Vuex);

// Refer to the complete Vuex documentation: https://vuex.vuejs.org/

const vuexLocalStorage = new VuexPersist({
  key: 'vuex', 
  storage: window.localStorage,
  // Function that passes the state and returns the state with only the objects you want to store.
  // reducer: state => ({
    // track : state.track,       (Only modules listed here would be saved, do NOT change state shape)
  //}), 
  // Function that passes a mutation and lets you decide when to update localStorage.
  // filter: mutation => (true)
})

export default new Vuex.Store({
  // Single source for application state.
  // Cannot update state directly; use a `mutation` (below).
  // Access in components as `this.$store.state.currentAccount`
  plugins: [vuexLocalStorage.plugin],
  
  state: {
    user : {
      loggedIn : true,
      data : null
    },
    
    currentTrack : "",
    tracks : {},
    courses : coursesData,
    customCourses : {
    },
    customDegrees : [],
    degrees : [
      {
        id : 1,
        department : "Computer Science and Engineering",
        name : "Computer Science: Digital Media BS",
        type : "B.S.",
        minimumHours : 75,
        catalogYear : 2020,
        categories : [
          {
            id : 1,
            name : "Core Requirements",
            requirementType : "all",
            courses : ["ART 152","ART 154","ART 156","ART 253","ART 456","COS 120","COS 121","COS 143","COS 243","COS 265","COS 350","COS 393","COS 492","COS 493","FMP 215","FMP 220","SYS 214"]

          },
          {
            id : 2,
            name : "Ethics",
            requirementType : "1",
            courses : ["COS 311","COS 321"]
          },
          {
            id : 3,
            name : "Upper-level Computer Science",
            requirementType : "courses",
            requirementValue : 2,
            courses : ["COS 331","COS 351","COS 424","COS xxx","SYS 310","MAT 215"]
          },
          {
            id : 4,
            name : "Film, Photography, Art",
            requirementType : "courses",
            requirementValue : 2,
            courses : ["ART 151","ART 251","ART 346","ART 353","FMP 230","FMP 430"]
          },
          {
            id : 5,
            name : "Electives",
            requirementType : "total",
            requirementValue : 75,
            courses : ["FMP 185","FMP 230","ART 346","FMP 430","ART 157","ART 151","ART 251","ART 353","ART 346","SYS 310","MAT 151","MAT 215","COS 331","COS 351","COS 424","COS ___","COS 310"]
          },
          
        ]
      },
      {
        id : 2,
        name : "Foundational Core",
        categories : [
          {
            id : 1,
            name : "Spiritual Foundation",
            requirementType : "all",
            courses : ["IAS 110","BIB 110","BIB 210","REL 313","PHI 413","IAS 495"]
          },
          {
            id : "2",
            name : "Stewardship of the Body - Fit For Life",
            requirementType : "1",
            courses : ["KIN 100"]
          },
          {
            id : "3",
            name : "Stewardship of the Body - Additional",
            requirementType : "1",
            courses : ["KIN 200","KIN 250","EXS 280","KIN 300","KIN 302","KIN 333","KIN 334"],     
          },
          {
            id : "4",
            name : "Fine Arts",
            requirementType : "1",
            courses : ["HUM 120","HUM 230","HUM 330"]
          },
          {
            id : "5",
            name : "Fine Arts - Electives",
            requirementType : "1",
            courses : ["JRN 332","HUM 250","ART ___","DAN ___","MUS ___"],
            custom : [
              {
                code : "ART ___",
                name : "Select Art Studio Course",
                hours : 3
              },
              {
                code : "DAN ___",
                name : "Dance Technique for the Actor",
                hours : 3,
              },
              {
                code : "MUS ___",
                name : "Music Ensemble or Lesson (private or class)",
                hours : 1
              }
            ]
          },
          {
            id : "6",
            name : "Speaking",
            requirementType : "1",
            courses : ["CAS 110","CAS 120"]
          },
          {
            id : "7",
            name : "Writing",
            requirementType : "1",
            courses : ["ENG 110"]
          },
          {
            id : "8",
            name : "History",
            requirementType : "1",
            courses : ["HIS ___"],
            custom : [
              {
              code : "HIS ___",
              name : "Any history course (check curriculum for exceptions)",
              hours : "3-5"
              }
            ]
          },
          {
            id : "9",
            name : "Computation",
            requirementType : "1",
            courses : ["COS 104","COS 105","COS 120","COS 130","EDU 242","MAT 285","SYS 120"]
          },
          {
            id : "10",
            name : "Mathematics",
            requirementType : "1",
            courses : ["MAT 110","MAT 120","MAT 140","MAT 145","MAT 151","MAT 180","MAT 210","MAT 220","MAT 301","MAT 302","MAT 302","SOC 355"]
          },
          {
            id : "11",
            name : "Literature",
            requirementType : "1",
            courses : ["ENG 230","ENG 240","ENG 250","THR 112"]
          },
          {
            id : "12",
            name : "Science",
            requirementType : "hours",
            requirementValue : 7,
            comment : "Must choose 2 classes from different groups (reference curriculum)",
            courses : ["BIO 100","BIO 102","BIO 104","BIO 106","BIO 201","BIO 244","CHE 120","SUS 200","SUS 231","CHE 100","CHE 120","CHE 201","CHE 221","PHY 120","PHY 203","PHY 211","ENP 345","ENS 241","ENS 242","GEO 210","PHY 201","NAS 201"]
          },
          {
            id : "13",
            name : "Social Science",
            requirementType : "courses",
            requirementValue : 2,
            comment : "Choose from different departments, 1 from Civic Engagement",
            courses : ["ANT 200","ANT 280","ECO 201","ECO 202","EDU 384","EXS 346","FIN 194","GEO 230","PBH 100","PBH 100","POS 100","POS 150","POS 213","POS 213","POS 331","PSY 315","SOC 100","SOC 110","SOC 210","SOC 220","SOC 315","SOC 410","SWK 200","SWK 320","GEO 220","HIS 211","HIS 212","HIS 213","HIS 215","HIS 321","POS 222","POS 312","PSY 100","PSY 240","PSY 250","PSY 340","PSY 350","SOC 310","SOC 330","SOC 361","SOC 381","SYS 330"]
          },
          
          

        ]
      }
    ],
    tags : {
      1 : {
        name : "CC",
        id : "1",
        description : "Cross Cultural Credit",
        text : "test",
        value : "1"

      }
    },


  },


  getters: {
    isLoggedIn(state) {
      return state.user.loggedIn;
    },
    user(state) {
      return state.user;
    },
    getCourses(state) {
      let rawCourses = state.courses;
      let courses = {};
      for (let course of Object.values(rawCourses)){
        if (!course.hidden){
          courses[course.code]=course
        }
      }
      for (let courseI of Object.keys(state.customCourses)){
        courses[courseI]=state.customCourses[courseI]
      }
      return courses;
    },
    getCurrentTrack(state){
      return state.tracks[state.currentTrack];
    },
    getTracks(state){
      return state.tracks;
    },
    getTrackNames(state){
      let out = [];
      for (let i in state.tracks){
        out.push(state.tracks[i].name);
      }
      return out;
    },
    getTags(state){
      return state.tags;
    },
    getFoundationalCore(state){
      return state.degrees.filter(obj => {
        return obj.name === "Foundational Core"
      });
    },
    getCurrentDegrees(state){
      let out = {};
      let degrees = state.customDegrees.concat(state.degrees);
      for (let i of state.tracks[state.currentTrack].currentDegrees){
        out[i]=degrees.filter(obj => {
          return obj.name === i;
        })[0];
      }
      return out;
    },
    getCurrentDegreeNames(state){
      return state.tracks[state.currentTrack].currentDegrees;
    },
    
    getDegrees(state){
      let rawDegrees = state.degrees;
      let out = [].concat(state.customDegrees);
      let customDegreeCompletes = [];
      for (let degree of state.customDegrees){
        customDegreeCompletes.push(degree.name+degree.type);
      }
      for (let degree of rawDegrees){
        if (!(degree.hidden ||  (degree.name+degree.type) in customDegreeCompletes)){
          out.push(degree);
        }
      }
      return out;
    },
    getCourseSelections(state){
      if (Object.keys(state.tracks).length==0) return {};
      let courseSelections = state.tracks[state.currentTrack].courseSelections;
      let manuallyAdded = [];
      for (let yearI in state.tracks[state.currentTrack].years){
        let year = state.tracks[state.currentTrack].years[yearI];
        for (let semesterI in year.semesters){
          let semester = year.semesters[semesterI]
          for (let courseI in semester.courses){
            let course = semester.courses[courseI];
            if (!courseSelections[course]){
              manuallyAdded.push(course);
            }
          }
        }
      }
      for (let course of state.tracks[state.currentTrack].unplacedClasses){
        if (!courseSelections[course]){
          manuallyAdded.push(course);
        }
      }
      courseSelections["manuallyAdded"]=manuallyAdded;
      return courseSelections;
      
    },
    getState(state){
      return state;
    },
    getCurrentPlanFile(state){      //For the most part, Track == Plan
      // let customCourses = {};
      // let customDegrees = [];
      let customTags = [];

      // for (let course of Object.values(state.courses)){
      //   if (course["custom"]){
      //     customCourses.push(course);
      //   }
      // }
      // for (let degree of Object.values(state.degrees)){
      //   if (degree["custom"]){
      //     customDegrees.push(degree);
      //   }
      // }
      for (let tag of Object.values(state.tags)){
        if (tag["custom"]){
          customTags.push(tag);
        }
      }
      return {
        name : state.currentTrack,
        customTags : customTags,
        customDegrees : state.customDegrees,
        customCourses : state.customCourses,
        track : state.tracks[state.currentTrack],
      };
    },
    getClassesTaking (state) {
      let track = state.tracks[state.currentTrack];
      let classesTaking = [...track.unplacedClasses];

      for (let yearI in track.years){
        let year = track.years[yearI];
        for (let semesterI in year.semesters){
          let semester = year.semesters[semesterI]
          for (let courseI in semester.courses){
            let course = semester.courses[courseI];
            classesTaking.push(course)
          }
        }
      }
      return classesTaking;
    },
    getSubstitutions(state){
      return state.tracks[state.currentTrack].substitutions;
    },
    

  },
  mutations: {
    setLoggedIn(state, value) {
      state.user.loggedIn = value;
    },
    setUserData(state,data){
      state.user.data = data;
    },
    updateTrack(state,trackRef) {
      let track = JSON.parse(JSON.stringify(trackRef));
      state.tracks[state.currentTrack]=track;
    },

    updateUnplacedClasses (state, unplacedRef) {
      let unplaced = JSON.parse(JSON.stringify(unplacedRef));

      state.tracks[state.currentTrack].unplacedClasses=unplaced;
    },
    
    addCourse (state,data){
      if (!(data.year && data.semester)) {  //If semester not specified, send to unplaced
        state.tracks[state.currentTrack].unplacedClasses.push(data.course);
        Vue.set(state.tracks,state.currentTrack,state.tracks[state.currentTrack])//todo, make sure this isn't breaking anything
        
      }
      else {
        state.tracks[state.currentTrack].years[data.year].semesters[data.semester].courses.push(data.course);
        
      }
    },
    removeCourse (state,course){
      for (let courseI = 0; courseI < state.tracks[state.currentTrack].unplacedClasses.length; courseI++ ){
        if ( state.tracks[state.currentTrack].unplacedClasses[courseI] === course) {
          state.tracks[state.currentTrack].unplacedClasses.splice(courseI, 1); 
          courseI--;
        }
      }
      for (let yearI in state.tracks[state.currentTrack].years){
        let year = state.tracks[state.currentTrack].years[yearI];
        for (let semesterI in year.semesters){
          let semester = year.semesters[semesterI]
          for( let courseI = 0; courseI < semester.courses.length; courseI++){ 
            if ( semester.courses[courseI] === course) {
              state.tracks[state.currentTrack].years[yearI].semesters[semesterI].courses.splice(courseI, 1); 
              courseI--;
            }
         }
        }
      }
    },
    removeCourseAtLocation (state,data){
      let courses;
      if (data.year){
        console.log('test')
        courses = state.tracks[state.currentTrack].years[data.year.year].semesters[data.semester.id].courses;
        console.log(courses)
        courses.splice(courses.indexOf(data.course),1);
        state.tracks[state.currentTrack].years[data.year.year].semesters[data.semester.id].courses=courses;
        console.log(state.tracks[state.currentTrack].years[data.year.year].semesters[data.semester.id].courses)
      } else { //Unplaced Classes
        courses = state.tracks[state.currentTrack].unplacedClasses;
        console.log(courses)
        courses.splice(courses.indexOf(data.course),1);
        state.tracks[state.currentTrack].unplacedClasses=courses;
        console.log(state.tracks[state.currentTrack].unplacedClasses)
      }
      
    },
    
    changeCurrentTrack(state,track){
      if (track.name){
        state.currentTrack=track.name;
      }
      else {
        state.currentTrack=track;
      }
    },
    addTrack(state,track){
      if (!state.tracks[track.id]){
        Vue.set(state.tracks, track.id, track);
        // state.tracks[track.id]=track;
        state.currentTrack = track.id;

      }
      else {console.log("Duplicate error, plan by that ID already exists")}
    },
    addCourseSelection(state,data){
      let course = data.course;
      let category = data.category;
      let degree = data.degree;

      if (state.tracks[state.currentTrack].courseSelections[course]){
        return false;
      }
      
      let toAdd = {
        code : course,
        degree : degree,
        meetsCategory : category,
      };
      Vue.set(state.tracks[state.currentTrack].courseSelections, course, toAdd);
      
    },
    manuallyAddCourseSelection (state,course){
      state.tracks[state.currentTrack].courseSelections.manuallyAdded.push(course);
    },
    removeCourseSelection(state,course){
      delete state.tracks[state.currentTrack].courseSelections[course];
    },
    removeManuallyAdded (state,course){
      for( var i = 0; i < state.tracks[state.currentTrack].courseSelections.manuallyAdded.length; i++){ 
        if ( state.tracks[state.currentTrack].courseSelections.manuallyAdded[i] === course) {
          state.tracks[state.currentTrack].courseSelections.manuallyAdded.splice(i, 1); 
          i--;  //In case of duplicate issues, will delete all instances of manually added courses.
        }
     }
    },
    removeTrack(state,trackName){
      delete state.tracks[trackName];
    },
    addDegree(state,degreeName){
      state.tracks[state.currentTrack].currentDegrees.push(degreeName);
    },
    createDegree(state,degree){
      state.degrees.push(degree);
    },
    removeDegree(state,degreeName){
      var index = state.tracks[state.currentTrack].currentDegrees.indexOf(degreeName);
      if (index !== -1) state.tracks[state.currentTrack].currentDegrees.splice(index, 1); 
    },
    saveCustomCourse(state,course){
      course["custom"]=true;
        if (state.customCourses[course.code]){
          //Edit course
          state.customCourses[course.code]=course;
        }
        else {
          //Create Course
          Vue.set(state.customCourses, course.code, course);
        }
    },
    hideCourse(state,course){
      Vue.set(state.courses[course],"hidden",true);
    },
    unhideCourse(state,course){
      state.courses[course]["hidden"]=false;
    },
    createCourse(state,course){ 
      course["custom"]=true;
      Vue.set(state.courses, course.code, course);
      // state.courses[course.code]=course;
    },
    deleteCustomCourse(state,course){ 
      if (course.code){course=course.code;}
      Vue.delete(state.customCourses, course)

    },

    hideDegree(state,name,type){
      for (let degree in this.state.degrees){
        if (this.state.degrees[degree].name==name&&this.state.degrees[degree].type==type){
          Vue.set(state.degrees[degree],"hidden",true);
        }
      }
    },
    deleteCustomDegree(state,name,type){ 
      for (let degree in this.state.customDegrees){
        if (this.state.customDegrees[degree].name==name&&this.state.customDegrees[degree].type==type){
          Vue.delete(state.customDegrees,degree);
        }
      }
    },
    saveCustomDegree(state,degree){
      let creating = true;
      degree["custom"]=true;

      for (let idx in this.state.customDegrees){
        if (this.state.customDegrees[idx].name==degree.name&&this.state.customDegrees[idx].type==degree.type){  
          Vue.set(state.customDegrees,idx,degree);  //Editing degree
          creating = false;
          break;
        }
      }
        if (creating){    //Creating degree
          state.customDegrees.push(degree)
        }
    },

    addSubstitution(state,substitution){
      if (!state.tracks[state.currentTrack].substitutions){
        console.log("Inserting substitutions attribute")
        Vue.set(state.tracks[state.currentTrack],"substitutions",[]);
      }
      state.tracks[state.currentTrack].substitutions.push(substitution)
      
    },
    removeSubstitution(state,substitution){
      let substitutions = state.tracks[state.currentTrack].substitutions;
      for (let sub in substitutions){
        // if (substitutions[sub].degree==substitution.degree && substitutions[sub].category.name==substitution.category.name && substitutions[sub].replacedHours==substitution.replacedHours ){}
        if (substitution==substitutions[sub]){
          state.tracks[state.currentTrack].substitutions.splice(sub,1);
          break;
        }
      }
    }
    


  },
  actions: {
    fetchUser({ commit }, user) {
      commit("setLoggedIn", user !== null);
      if (user) {
        commit("setUserData", user);
      } else {
        commit("setUserData", null);
      }
    },
    savePlan(){
      

      // console.log(this.state.user.data.refreshToken);


      // this.$axios
      //   .post("https://www.googleapis.com/upload/drive/v3/files?uploadType=media", {
      //     "Content-Type":"JSON",
      //     "Content-Length":5,
      //     "Authorization" : "Bearer "
      //   })
      //   .then(result => {
          
          
      //   })
      

      
      // const fs = require('fs');
      // const readline = require('readline');
      // const {google} = require('googleapis');

      // // If modifying these scopes, delete token.json.
      // const SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly'];
      // // The file token.json stores the user's access and refresh tokens, and is
      // // created automatically when the authorization flow completes for the first
      // // time.
      // const TOKEN_PATH = 'token.json';

      // // Load client secrets from a local file.
      // fs.readFile('credentials.json', (err, content) => {
      //   if (err) return console.log('Error loading client secret file:', err);
      //   // Authorize a client with credentials, then call the Google Drive API.
      //   authorize(JSON.parse(content), listFiles);
      // });

      // let tracks1 = this.state.tracks;
      // console.log("Saving... 2")

      // let tracks = JSON.stringify(tracks1);

      // var fs = require('fs');
      // let out = fs.createWriteStream("../saves/tracks.json", {
      //   flags: 'w' 
      // });
      // out.write(tracks);

    }
  }
});

