<template>
  <div> 
    <v-fade-transition><v-btn large v-if="showC" class="ma-3" style="position:fixed; right:5px; z-index: 1000;" color="primary"  v-bind:to = "{ name: 'join' }" >Join Us</v-btn></v-fade-transition>
    <v-img  src="/work/gradient.png"  width="100vw" min-height="500px" max-height="60vh">
    <v-container style="height:100%;" justify-content="center">
      <v-row style="height:60%"/>
      <v-row
        align="center"
        justify="center"
        style="width:100%;"
        

         
      >
        <v-col md=3 cols=12 style="height:10px"/>
        <v-col class="text-center" cols = 12 md=6 style="z-index:999;" >
          <v-fade-transition >
          <h4 v-if="showB" style="color:white;" >Be a part of the solution</h4>
          </v-fade-transition>

          <br>
          
        </v-col>
        <v-col class="text-center" cols = 12  style="z-index: 999" >

          <v-fade-transition >
          </v-fade-transition>


          <br>
          
        </v-col>
      </v-row>
      </v-container>
    </v-img>
    <v-fade-transition >
      <v-img  v-if="show"  src="/work/gradient-logo.png"  style="z-index: 0; position:absolute; top: 1px;" width="100vw" min-height="500px" max-height="60vh"/>
    </v-fade-transition>    
    
    <v-img
            src="/work/postcard.png"
            lazy-src="/work/postcard-lo.png"
            width="100vw"
            
            
            />
    


      
      
     
      
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: false,
      showB: false,
      showC: false,

      img: false,
    }
  },
  mounted() {
    setTimeout(() => {  this.show = true;  }, 250);
    setTimeout(() => {  this.showB = true;  }, 750);
    setTimeout(() => {  this.showC = true;  }, 1000);

  },
  methods : {
    showImg() {
      this.img=true;
    },
  }
}
</script>
