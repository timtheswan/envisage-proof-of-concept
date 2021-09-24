<template>
<div>
  
  <section id="hero">
        <v-row no-gutters>
          <v-img
            :min-height="'calc(100vh - ' + $vuetify.application.top + 'px)'"
            src="/home.jpg"
          >
            <v-theme-provider dark>
              <v-container fill-height>
                <v-speed-dial v-model="dialShare" absolute right top direction="left" open-on-hover>
                    <template v-slot:activator>
                      <v-btn fab top small color="primary">
                        <!-- <v-icon v-if="dialShare">mdi-close</v-icon> -->
                        <v-icon >mdi-share-variant</v-icon>
                      </v-btn>
                    </template>
                    <v-btn dark fab bottom color="blue darken-7" small :href="`https://www.instagram.com/envisageplanner/`" target="_blank"> 
                      <!-- Can be used to share Envisage with others like https://www.linkedin.com/shareArticle?mini=true&url=${pageUrl} -->
                      <v-icon>mdi-instagram</v-icon>
                    </v-btn>
                    <v-btn dark fab bottom color="red" small :href="`https://www.youtube.com/channel/UCog0FgyZJzS95-80rjDlB9w`" target="_blank">
                      <v-icon>mdi-youtube</v-icon>
                    </v-btn>
                    <!-- <v-btn dark fab bottom color="tertiary" small :href="`mailto:?subject=Awesomeness!&amp;body=Checkout this page!<a href='${pageUrl}'>${pageUrl}</a>`" target="_blank">
                      <v-icon>mdi-email</v-icon>
                    </v-btn> -->
                  </v-speed-dial>
                <v-row
                  align="center"
                  class="white--text mx-auto"
                  justify="center"
                >
                  <v-col
                    class="white--text text-center"
                    cols="12"
                    tag="h1"
                  >
                    
                    <span
                      :class="[$vuetify.breakpoint.smAndDown ? 'display-3': 'display-4']"
                      class="font-weight-black"
                    >
                      ENVISAGE
                    </span>

                    <br>
                    
                    <span
                      class="body font-weight-regular"
                    >
                      REIMAGINING COLLEGE THROUGH ACADEMIC PLANNING
                    </span>
                  </v-col>

                   <v-btn outlined dark v-bind:to = "{ name: 'plan' }" >Try our prototype</v-btn>
                </v-row>
              </v-container>
            </v-theme-provider>
          </v-img>
        </v-row>
      </section>
      
      <section id="about-me">
        <div class="py-12"></div>

        <v-container class="text-center">
          <h2 class="display-2 font-weight-bold mb-3">OUR MISSION</h2>

          <v-responsive
            class="mx-auto mb-8"
            width="56"
          >
            <v-divider class="mb-1"></v-divider>

            <v-divider></v-divider>
          </v-responsive>

          <v-responsive
            class="mx-auto title font-weight-light mb-8"
            max-width="720"
          >
          <p>We are here to improve the value of students’ education by encouraging and enabling them to create a simple, robust, and long-term plan.</p>


          <p> Through this we envision an individualized higher education system that can suit each student's unique needs, goals, and passions.</p>

          </v-responsive>

         

          <div></div>
          <v-row align-content="center">
            <v-col cols='12' md = '1'/>
            <v-col  cols='12' md = '4'>
            <h4 class="subtitle-1 font-weight-bold mb-3">Interested in Working on Envisage?</h4>

            <v-btn
              color="secondary"
              href=""
              outlined
              
              v-bind:to = "{ name: 'work' }"
            >
            Learn More
            </v-btn>
            </v-col>
            <v-col cols='12' md='2'>
               <v-avatar
                  class="elevation-12 mb-12"
                  size="128"
                >
                  <v-img src="/favicon.ico"></v-img>
                </v-avatar>
            </v-col>
            <v-col cols='12' md = '4'>
            
            <h4 class="subtitle-1 font-weight-bold mb-3">Interested in Investing?</h4>
            <v-btn
              color="secondary"
              href=""
              outlined
              
              v-bind:to = "{ name: 'investor' }"
            >
              View the Slideshow
              
            </v-btn>
            </v-col>
          </v-row>
        </v-container>

        <div class="py-12"></div>
      </section>

      <section
        id="features"
        class="grey lighten-3"
      >
        <div class="py-12"></div>

        <v-container class="text-center">
          <h2 class="display-2 font-weight-bold mb-3">WHY US?</h2>

          <v-responsive
            class="mx-auto mb-12"
            width="56"
          >
            <v-divider class="mb-1"></v-divider>

            <v-divider></v-divider>
          </v-responsive>

          <v-row>
            <v-col
              v-for="({ icon, title, text }, i) in features"
              :key="i"
              cols="12"
              md="4"
            >
              <v-card
                class="py-12 px-4"
                color="grey lighten-5"
                flat
              >
                <v-theme-provider dark>
                  <div>
                    <v-avatar
                      color="primary"
                      size="88"
                    >
                      <v-icon
                        large
                        v-text="icon"
                      ></v-icon>
                    </v-avatar>
                  </div>
                </v-theme-provider>

                <v-card-title
                  class="justify-center font-weight-black text-uppercase"
                  v-text="title"
                ></v-card-title>

                <v-card-text
                  class="subtitle-1"
                  v-text="text"
                >
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>

        <div class="py-12"></div>
      </section>

      <section id="stats">
        <v-parallax
          :height="$vuetify.breakpoint.smAndDown ? 700 : 500"
          src="code2.jpg"
        >
          <v-container fill-height class="text-center">
          <!-- <h2 class="mc-auto display-2 font-weight-bold mb-3">ENVISAGE FEATURES</h2> -->

          
          <v-row>
              <v-responsive
                class="mx-auto display-1 font-weight-black mb-8"
                max-width="720"
              >
              JUST THE BEGINNING
             </v-responsive>
          </v-row>
             <!-- <v-responsive
                class="mx-auto title font-weight-light mb-8"
                max-width="720"
              >
              Envisage is currently a personal project, but I hope it will soon become more!
             </v-responsive> -->
            <v-row class="mx-auto">
              <v-col
                v-for="[value, title] of adjustedStats"
                :key="title"
                cols="12"
                md="4"
              >
                <div class="text-center">
                  <div
                    class="display-3 font-weight-black mb-4"
                    v-text="value"
                  ></div>
  
                  <div
                    class="title font-weight-regular text-uppercase"
                    v-text="title"
                  ></div>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-parallax>
      </section>
      
      <v-sheet
        id="contact"
        class="grey lighten-3"
        tag="section"
        tile
      >
        <div class="py-12"></div>

        <v-container>
          <h2 class="display-2 font-weight-bold mb-3 text-uppercase text-center"> Contact Us</h2>
          <v-responsive
            class="mx-auto mb-8"
            width="56"
          >
            <v-divider class="mb-1"></v-divider>

            <v-divider></v-divider>
          </v-responsive>
          <v-row class="mb-5" align-content="center">
            <v-col cols=12 md=4 />
            <v-col  cols=12 md=4 class=" text-center">
            <h4 class="display-1 font-weight-bold mb-3">Interested in Joining?</h4>

            <v-btn
              color="primary"
              href=""
              large
              
              v-bind:to = "{ name: 'join' }"
            >
            Tell Us About Yourself
            </v-btn>
            </v-col>
          </v-row>
          <v-row align="center" justify="center">
          <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSdz7O08FIkc4B5-8esUMrdfPzW-QO7YRn9jWE03fVg5X-mFMw/viewform?embedded=true" width="640" height="700" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
          </v-row>
          

        </v-container>

        <div class="py-12"></div>
      </v-sheet>
</div>

  <!-- <v-container>
    <v-card>
        <v-card-title>
          Welcome to Envisage!
        </v-card-title>
        <v-card-subtitle>
          Academic advising at the speed of thought
        </v-card-subtitle>
        <v-card-text>
          Envisage is an academic planning tool designed by a frustrated student that seeks to provide students with the tools needed make important academic decisions in a minimally stressful environment. Whether you are deciding what degree(s) you want to take, what courses, or when to take them, this tool consolidates all academic decision making into one seamless environment.
          <br><br>
          <strong>WARNINGS:</strong> Envisage is only partially functional, and currently suitable only for demonstration purposes. This has currently only been tested on Chrome Desktop. Currently, the courses and track tabs of the planner are all that I've done much on so far.  All changes are currently only saved locally, this means you must load the page on the same computer, and the same browser. This will be fixed in the future. If things still don't work, try resetting browswer storage (top right corner menu) and re-creating your data from scratch, it's likely my changes will break old data.

        </v-card-text>
        <v-card-text>
          <v-btn color=primary v-bind:to = "{ name: 'plan' }">
            Start Planning!
          </v-btn>
        </v-card-text>
        


    </v-card>
  </v-container> -->
</template>
<script>
export default {
  data () {
    return {
      testingStuff: "lalala",
      dialShare: false,
      features: [
            
            {
              icon: 'mdi-podium-gold',
              title: 'We Put the Student First',
              text: "Whereas the primary focus of other tools is to serve the interests of advisors, registrars, or administrators, we design Envisage to serve the student first. Ever wondered why a seemingly vital feature didn’t exist? It’s because the product was designed with someone else in mind."
            },
            {
              icon: 'mdi-hand-heart-outline',
              title: 'Here to be Helpful',
              text: 'Envisage is designed by students who know the struggle of simply trying to graduate on time. Because we believe that your college experience can be so much more than these frustrations, Envisage helps you focus on the things important to you. Tools such as an automated advisor, career-relevant information, and connections for peer-to-peer advising help you design your academic plan to get the most out of your time at school.',
            },
            {
              icon: 'mdi-emoticon-happy-outline',
              title: 'Simply Enjoyable',
              text: "When you need to focus on what’s important, having a tool that is intuitive and pleasant to use is no longer just nice, it’s necessary. By emphasizing the importance of good and simple design and transforming the tedious aspects of planning into trivial ones, Envisage enables academic planning at the speed of thought.",
            },
            
          ],
          stats: [
            ['1st', "Place at Taylor University's Shark Tank"],
            ['49.8k', 'Lines of code'],
            ['placeholder', 'Months until Beta Release'],
          ],
    } 
  },
  computed: {
    adjustedStats(){
      this.adjustStats();
      return this.stats;
    }
  },
  methods: {
    adjustStats(){
      let date = new Date();
      this.stats[2][0]=7-date.getMonth();
    }
  }

}
</script>
