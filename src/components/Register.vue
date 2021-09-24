<template>
  <!-- <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Register</div>
          <div class="card-body">
            <div v-if="error" class="alert alert-danger">{{error}}</div>
            <form action="#" @submit.prevent="submit">
              <div class="form-group row">
                <label for="name" class="col-md-4 col-form-label text-md-right">Name</label>

                <div class="col-md-6">
                  <input
                    id="name"
                    type="name"
                    class="form-control"
                    name="name"
                    value
                    required
                    autofocus
                    v-model="form.name"
                  />
                </div>
              </div>

              <div class="form-group row">
                <label for="email" class="col-md-4 col-form-label text-md-right">Email</label>

                <div class="col-md-6">
                  <input
                    id="email"
                    type="email"
                    class="form-control"
                    name="email"
                    value
                    required
                    autofocus
                    v-model="form.email"
                  />
                </div>
              </div>

              <div class="form-group row">
                <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>

                <div class="col-md-6">
                  <input
                    id="password"
                    type="password"
                    class="form-control"
                    name="password"
                    required
                    v-model="form.password"
                  />
                </div>
              </div>

              <div class="form-group row mb-0">
                <div class="col-md-8 offset-md-4">
                  <button type="submit" class="btn btn-primary">Register</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div> -->
  <v-card class="pl-5 pr-5">
    <!-- <v-container class="ml-3 mr-3"> -->
        <v-card-title>
            Register
        </v-card-title>
        <v-divider/>
        <v-form ref="form" :v-model="valid" lazy-validation> 
            <v-card-text class="pl-3 pr-3 pb-0">
              <v-text-field
                    label="Name"
                    type="name"
                    name="name"
                    id="name"
                    v-model="form.name"
                    rounded
                    filled

                />
                <v-text-field
                    label="Email"
                    type="email"
                    name="email"
                    id="email"
                    v-model="form.email"
                    rounded
                    filled

                />
                <v-text-field
                    label="Password"
                    type="password"
                    name="password"
                    id="password"
                    v-model="form.password"
                    rounded
                    filled

                />
                
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
                <v-btn :disabled="!valid" color="primary" filled text @click="submit">Register</v-btn>
            </v-card-actions>
            
        </v-form>
        
    <!-- </v-container> -->
    </v-card>
</template>


<script>
import firebase from "firebase";

export default {
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: ""
      },
      error: null,
      loading: false,
    };
  },
  computed : {
      valid (){
          return this.form.email!="" && this.form.password!=""&& this.form.name!="";
      }
  },
  methods: {
    submit() {
      this.error=null;
      this.loading=true;
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.form.email, this.form.password)
        .then(data => {
          this.loading=false;
          data.user
            .updateProfile({
              displayName: this.form.name
            })
            .then(() => {});
            this.$emit("registered")
        })
        .catch(err => {
          this.loading=false;
          this.error = err.message;
        });
    },
    cancel() {
        this.$emit("cancel");
    }
  }
};
</script>