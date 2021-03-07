//initial data
var feed = [
                    {
                        "name": "Kanye West",
                        "category": "Entertaiment",
                        "photo": "assets/img/kanye.png",
                        "description": "Vestibulum diam ante, porttitor a odio eget, rhoncus neque. Aenean eu velit libero.",
                        "likes": 64,
                        "dislikes": 36,
                        "votes": 100

                    },
                    {
                        "name": "Mark Zuckerberg",
                        "category": "Business",
                        "photo": "assets/img/mark.png",
                        "description": "Vestibulum diam ante, porttitor a odio eget, rhoncus neque. Aenean eu velit libero.",
                        "likes": 36,
                        "dislikes": 64,
                        "votes": 100

                    },
                    {
                        "name": "Cristina Fernández de Kirchner",
                        "category": "Politics",
                        "photo": "assets/img/cristina.png",
                        "description": "Vestibulum diam ante, porttitor a odio eget, rhoncus neque. Aenean eu velit libero.",
                        "likes": 64,
                        "dislikes": 36,
                        "votes": 100

                    },

                    {
                        "name": "Malala Yousafzai",
                        "category": "Entertaiment",
                        "photo": "assets/img/malala.png",
                        "description": "Vestibulum diam ante, porttitor a odio eget, rhoncus neque. Aenean eu velit libero.",
                        "likes": 64,
                        "dislikes": 36,
                        "votes": 100

                    }
            ];

//vote-card template
let VOTE_TEMPLATE = `
                        <div class="vote-card candidate-container col-12 col-md-6">

							<div class="candidate-wrapper" :style="{ backgroundImage: 'url(' + imagen + ')', height: '600px' }">>

								<div class="candidate-information">

									<div class="candidate-information-text ml-3 mr-3">

                    <div class="row">
                      <a  v-if="likePercentage > dislikePercentage" class="btn-vote-like"><i class="fa fa-thumbs-up" aria-hidden="true"></i></a>
                      <a  v-if="likePercentage < dislikePercentage" class="btn-vote-dislike"><i class="fa fa-thumbs-down" aria-hidden="true"></i></a>
                      <h4 class="candidate-information-title col-11">{{ candidate.name }}</h4>
                    </div>
										
										<p class="time-ago">1 month ago <span class="field-of-action">{{ candidate.category }}</span></p>
										<p class="candidate-information-description">{{ candidate.description }}</p>

										<div class="voting-section">
											<a  @click="likeVote" :class="{ highlighted: likeActive }" class="btn-vote-like"><i class="fa fa-thumbs-up" aria-hidden="true"></i></a>
											<a  @click="dislikeVote" :class="{ highlighted: dislikeActive }" class="btn-vote-dislike"><i class="fa fa-thumbs-down" aria-hidden="true"></i></a>
											<a  @click="vote" class="btn-vote-now">{{this.voteText}}</a>
										</div>

									</div>

									
									<div class="custom-row mt-3">
										<div :style="{flex: '0 0 ' + likePercentage + '%' , maxWidth: likePercentage + '%'}" class="vote-like-wrapper"><a class="vote-like"><i class="fa fa-thumbs-up" aria-hidden="true"></i></a><span class="like-dislikes-results">{{ likePercentage }}%</span></div>
										<div :style="{flex: '0 0 ' + dislikePercentage + '%' , maxWidth: dislikePercentage + '%'}" class="vote-dislike-wrapper"><span class="like-dislikes-results">{{ dislikePercentage }}% </span><a  class="vote-dislike"><i class="fa fa-thumbs-down" aria-hidden="true"></i></a></div>
									</div>
									
	
								</div>

							</div>


						</div>

`;

//Components
Vue.component('vote-candidate', {
    data: function () {
      return {
        likes: this.$props.candidate.likes,
        dislikes: this.$props.candidate.dislikes,
        likePercentage: 0,
        dislikePercentage: 0,
        votes: this.$props.candidate.votes,
        likeActive: false,
        dislikeActive: false,
        imagen: this.$props.candidate.photo,
        voteDone: false,
        voteText: 'Vote Now'
      }
    },
    mounted(){

      //check in local storage if data exists otherwise save information.
      let item = localStorage.getItem(this.$props.candidate.name);
      
      if(item){

        let itemJson = JSON.parse(item);

        this.likes = itemJson.likes;
        this.dislikes = itemJson.dislikes;
        this.votes = itemJson.votes;

      }




      this.percentage();
      
    },
    methods: {

      percentage(){

        if(this.votes > 0){

          this.likePercentage = Math.round((this.likes / this.votes) * 100 );
          this.dislikePercentage = Math.round( (this.dislikes / this.votes) * 100 );
  
        }
      },

      likeVote() {

        this.likeActive = true;
        this.dislikeActive = false;


      },

      dislikeVote() {
        this.likeActive = false;
        this.dislikeActive = true;
      },

      vote() {
        
        if(this.likeActive || this.dislikeActive){

          this.voteDone = true;
          this.voteText = 'Vote Again';
          

          this.votes += 1;
          
          if(this.likeActive){
              this.likes = this.likes + 1;
          }else{
              this.dislikes = this.dislikes + 1;
          }

          let itemToStore = {
              likes: this.likes,
              dislikes: this.dislikes,
              votes: this.votes
          };

          localStorage.setItem(this.$props.candidate.name, JSON.stringify(itemToStore));
       

          this.likeActive = false;
          this.dislikeActive = false;

          this.percentage();

          swal( "Good Job!","Thank you for voting!", "success");

        }else{

          swal( "You must select an option!","Choose thumbs up or thumbs down", "error");
        }
        
      }



    },
    props: ['candidate'],
    template: VOTE_TEMPLATE
  });


//Vue app instance
var app = new Vue({
    el: '#app',
    data: {
        candidates: feed,
      }
  })