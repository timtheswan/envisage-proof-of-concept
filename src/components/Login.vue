<template>
    <v-card class="pl-5 pr-5">
    <!-- <v-container class="ml-3 mr-3"> -->
        <v-card-title>
            Log In
        </v-card-title>
        
        <v-divider/>
        <v-form ref="form" :v-model="valid" lazy-validation> 
            <v-card-text class="pl-3 pr-3 pb-0">
                <v-text-field
                    label="Email"
                    type="email"
                    name="email"
                    id="email"
                    v-model="form.email"
                    rounded
                    filled
                    disabled

                />
                <v-text-field
                    label="Password"
                    type="password"
                    name="password"
                    id="password"
                    v-model="form.password"
                    rounded
                    filled
                    disabled

                />

                Envisage currently only works if signed into Google <br>
                <div class="d-flex justify-center">
                <v-btn  outlined color="success" @click = "signInGoogle"  height="46px" class = "ma-3" style = "box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2)">
                    <div class="mr-3"> Sign In With Google </div>
                    <v-img  width="32px" src="https://cdn4.iconfinder.com/data/icons/new-google-logo-2015/400/new-google-favicon-512.png"/>
                </v-btn>
                </div>

            </v-card-text>

            <!-- <v-divider/> -->
            <v-alert
            color="red darken-2"
            type="error"
            :value="error!=null"
            class="pa-1"
            transition="scale-transition"
            outlined
            >Error: {{error}}</v-alert
            >
            <v-card-actions>
                <v-btn color="secondary" text @click="cancel">Cancel</v-btn>

                <v-spacer/>
                <v-btn :loading=loading :disabled="!valid" color="primary" filled text @click="submit">Log In</v-btn>
            </v-card-actions>
            
        </v-form>
        
    <!-- </v-container> -->
    </v-card>
</template>

<script>
// import firebase from "firebase";

export default {
  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      error: null,
      loading : false,
    };
  },
  computed : {
      valid (){
          return this.form.email!="" && this.form.password!="";
      }
  },
  methods: {
    // submit() {
    // this.loading=true;
    // this.error = null,
    //   firebase
    //     .auth()
    //     .signInWithEmailAndPassword(this.form.email, this.form.password)
    //     .then(data => {
    //         this.loading=false;
    //         this.$emit("login",data);
    //         this.$router.replace('plan');

    //     })
    //     .catch(err => {
    //       this.loading=false;
    //       this.error = err.message;
    //     });
    // },
    cancel() {
        this.$emit("cancel");
    },
    // signInGoogle(){
    //   const provider = new firebase.auth.GoogleAuthProvider();

    //   firebase.auth().signInWithPopup(provider)
    //   .then((result) => {
    //     this.$emit("login",result);
    //     this.$router.replace('plan');
    //   })
    //   .catch((err)=> {
    //     alert(err.message);
    //   });
    // }

  }
};
</script>