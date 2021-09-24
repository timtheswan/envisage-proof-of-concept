<template>
  <div>
    <v-btn   color="primary" class="ma-3" style="position:fixed; right:35px; top:58px; z-index: 1000;"  v-bind:to = "{ name: 'join' }" >Join Us</v-btn>
    <v-tabs
        v-model="tab"
        centered
        dark
        background-color="rgba(0,0,0,0.5)"
        style="position:absolute; top: 0; z-index:3;"
      >
      <v-tab href="#tab-0">
          Slideshow
        </v-tab>

        <v-tab href="#tab-1" :disabled=noPlan>
          Shark Tank Video
        </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
        <v-tab-item
          :key="0"
          :value="'tab-' + 0"
        >
          <div style="transform: translateY(-20); position: relative; width: 100%; height: 0; padding-top: 56.2500%;
          padding-bottom: 48px; box-shadow: 0 2px 8px 0 rgba(63,69,81,0.16); margin-top: 1.6em; margin-bottom: 0.9em; overflow: hidden;
          will-change: transform; transform: translateY(-3.3vh);">
          <iframe style="max-height: 98vh; position: absolute; width: 100%; height: 100%; top: 0; left: 0; border: none; padding: 0;margin: 0;"
            src="https://www.canva.com/design/DAESfVGJJF4/view?embed">
          </iframe>
        </div>
        </v-tab-item>
        <v-tab-item
          :key="1"
          :value="'tab-' + 1"
        >
          <iframe width="100%" height="750" src="https://www.youtube-nocookie.com/embed/Wvy76NQIs4Y" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </v-tab-item>
    </v-tabs-items>
  </div>
</template>
<script>
export default {
  data () {
    return {
      tab: null,
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
