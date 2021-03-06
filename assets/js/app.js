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

										<h4 class="candidate-information-title">{{ candidate.name }}</h4>
										<p class="time-ago">1 month ago <span class="field-of-action">{{ candidate.category }}</span></p>
										<p class="candidate-information-description">{{ candidate.description }}</p>

										<div class="voting-section">
											<a class="btn-vote-like"><i class="fa fa-thumbs-up" aria-hidden="true"></i></a>
											<a class="btn-vote-dislike"><i class="fa fa-thumbs-down" aria-hidden="true"></i></a>
											<a class="btn-vote-now">Vote Now</a>
										</div>

									</div>

									
									<div class="custom-row mt-3">
										<div class="col-9 vote-like-wrapper"><a class="vote-like"><i class="fa fa-thumbs-up" aria-hidden="true"></i></a><span class="like-dislikes-results">{{ candidate.likes }}</span></div>
										<div class="col-3 vote-dislike-wrapper"><span class="like-dislikes-results">{{ candidate.dislikes }} </span><a class="vote-dislike"><i class="fa fa-thumbs-down" aria-hidden="true"></i></a></div>
									</div>
									
	
								</div>

							</div>


						</div>

`;

//Components
Vue.component('vote-candidate', {
    data: function () {
      return {
        name: '',
        likes: 0,
        dislikes: 0,
        description: '',
        category: '',
        total: 0,
        imagen: this.$props.candidate.photo
      }
    },
    created(){

        /*let pathname = window.location.pathname;
        let path = pathname.split("/");
        let filename = path[path.length - 1] ;
        console.log('pagina ',filename);
        let baseUrl = pathname.replace(filename,"")


        this.imagen = baseUrl + this.imagen;
        console.log(this.imagen);*/
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