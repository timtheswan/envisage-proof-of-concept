<template>
<div>
  <!-- <v-parallax src="/home.jpg"  height="600">
    <v-row
        align="center"
        justify="center"
      >
        <v-col class="text-center" cols="12">
          <h1 class="display-3 font-weight-thin mb-4">Envisage</h1>
          <h4 class="subheading">Academic planning at the speed of thought </h4>
          <br>
          <v-btn outlined dark v-bind:to = "{ name: 'plan' }" >Start Planning</v-btn>
        </v-col>
      </v-row>
      
      
  </v-parallax>
  <v-container>
  <h2>Welcome to Envisage!</h2>
  </v-container> -->
  <!-- <section id="hero">
        <v-row no-gutters>
          <v-img
            :min-height="'calc(50vh - ' + $vuetify.application.top + 'px)'"
            src="/home.jpg"
          >
            <v-theme-provider dark>
              <v-container fill-height>
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
                      class="font-weight-light"
                      :class="[$vuetify.breakpoint.smAndDown ? 'display-1' : 'display-2']"
                    >
                      JOIN US 
                    </span>

                    <br>

                    <span
                      :class="[$vuetify.breakpoint.smAndDown ? 'display-3': 'display-4']"
                      class="font-weight-black"
                    >
                      THE TEAM
                    </span>
                    <br>
                    <span
                      class="headline "
                    >
                      As we reimagine education
                    </span>

                  </v-col>
                  
                   <v-btn outlined dark v-bind:to = "{ name: 'plan' }" >Start Planning</v-btn>

                  
                </v-row>
              </v-container>
            </v-theme-provider>
          </v-img>
        </v-row>
      </section> -->

      <!-- <section id="about-me">
        <div class="py-12"></div>

        <v-container class="text-center">
          <h2 class="display-2 font-weight-bold mb-3">ABOUT ENVISAGE</h2>

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
          Envisage is the product of a student frustrated with the current tools avalible for academic planning. The process of academic planning is of vital importance, this tool seeks to minimize the stresses associated with planning your future. Whether choosing what degrees to take, what courses to take, or when to take them, Envisage seeks to simplify the process. 
          </v-responsive>

          <v-avatar
            class="elevation-12 mb-12"
            size="128"
          >
            <v-img src="/favicon.ico"></v-img>
          </v-avatar>

          <div></div>

          <v-btn
            color="grey"
            href=""
            outlined
            large
            disabled
          >
            <span class="grey--text text--darken-1 font-weight-bold">
              More About Envisage
            </span>
          </v-btn>
        </v-container>

        <div class="py-12"></div>
      </section> -->

      <!-- <section
        id="features"
        class="grey lighten-3"
      >
        <div class="py-12"></div>

        <v-container class="text-center">
          <h2 class="display-2 font-weight-bold mb-3">ENVISAGE FEATURES</h2>

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
      </section> -->
<!-- 
      <section id="stats">
        <v-parallax
          :height="$vuetify.breakpoint.smAndDown ? 700 : 500"
          src="code2.jpg"
        >
          <v-container fill-height class="text-center">

          
          <v-row>
              <v-responsive
                class="mx-auto display-2 font-weight-black mb-8"
                max-width="720"
              >
              JUST THE BEGINNING
             </v-responsive>
          </v-row>
             
            <v-row class="mx-auto">
              <v-col
                v-for="[value, title] of stats"
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
      </section> -->

      

      <v-sheet
        id="contact"
        class="grey lighten-3"
        tag="section"
        tile
      >
        <div class="py-4"></div>

        <v-container>
          <h2 class="display-1 font-weight-bold mb-3 text-uppercase text-center">Join our Team!</h2>
          <v-responsive
            class="mx-auto mb-12"
            width="56"
          >
            <v-divider class="mb-1"></v-divider>

            <v-divider></v-divider>
          </v-responsive>
          <v-row align="center" justify="center">
          <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSfw2LA7Od2K8NAO8CV7P_QzpmizFcWsz1fEGRGOBNGQeQzHOQ/viewform?embedded=true" width="750" height="650" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
          </v-row>
         
        </v-container>

        <!-- <div class="py-12"></div> -->
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
      features: [
            
            {
              icon: 'mdi-monitor-clean',
              title: 'Simple, Fast, Reliable',
              text: "Too often, existing tools are made and funded by people who only want a tool that tells you if your plan is right or wrong, and in all other areas, is just good enough to work. We believe that good user experience is not just nice, but essential for the tool to be effective.",
            },
            {
              icon: 'mdi-call-split',
              title: 'Flexibility',
              text: "In academic planning, there are exceptions and data can be wrong, this shouldn't prevent you from being able to have an accurate plan. Envisage will always let you modify any piece of data for yourself. Think of this version of Envisage as a glorified spreadsheet designed specifically for academic planning.",
            },
            {
              icon: 'mdi-set-center',
              title: 'Consolidation',
              text: 'Currently the process of academic planning is split across several tools. These areas of planning are highly interdependent, continuity and consistency between them is key. This also makes possible getting fast answers to those "what if" questions.',
            },
          ],
          stats: [
            ['59.2k', 'Lines of code'],
            ['250+', 'Hours Invested'],
            ['1st Place', "At Taylor University's Shark Tank"],
            
          ],
    } 
  }
}
</script>
