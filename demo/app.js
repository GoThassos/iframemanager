
	'use strict';

	// get module
	var manager = iframemanager();

	/**
	 * @typedef {object} WaitConfig
	 * @property {'script' | 'iframe'} type,
	 * @property {any} obj
	 * @property {string} [prop]
	 * @property {string} [selector]
	 */

	/**
	 * Wait until a property on the window object is available
	 * @param {WaitConfig} opts
	 * @returns {Promise<boolean>}
	 */
	const waitFor = async (opts) => {
		const {obj, type, prop, selector} = opts;

		const isIframe = type === 'iframe';

		const timeout = isIframe
			? 100
			: 10;

		const maxWait = 500;

		const objToCheck = prop
			? obj[prop]
			: obj;

		const isDefined = () => typeof
			(isIframe
				? obj.querySelector(selector)
				: objToCheck
			) !== 'undefined'

		let nIntervals = 0;

		return await new Promise(resolve => {
			const interval = setInterval(() => {
				const timedOut = !isIframe && ++nIntervals * timeout > maxWait;
				if (isDefined() || timedOut) {
					clearInterval(interval);
					resolve(!timedOut);
				}
			}, timeout);
		});
	};

	manager.run({
		currLang: document.documentElement.getAttribute('lang'),
		// autoLang: true,
		services : {
			youtube : {
				embedUrl: 'https://www.youtube-nocookie.com/embed/{data-id}',

				iframe : {
					allow : 'accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen;',
				},
				cookie : {
					name : 'cc_youtube'
				},
				languages : {
					'en' : {
						notice: 'This content is hosted by a third party. By showing the external content you accept the <a rel="noreferrer" href="https://www.youtube.com/t/terms" title="Terms and conditions" target="_blank">terms and conditions</a> of youtube.com.',
						loadBtn: 'Load video',
						loadAllBtn: 'Don\'t ask again'
					}
				}
			},
			dailymotion : {
				embedUrl: 'https://www.dailymotion.com/embed/video/{data-id}',

				// Use dailymotion api to obtain thumbnail
				thumbnailUrl: function(id, setThumbnail){

					var url = "https://api.dailymotion.com/video/" + id + "?fields=thumbnail_large_url";
					var xhttp = new XMLHttpRequest();

					xhttp.onreadystatechange = function() {
						if (this.readyState == 4 && this.status == 200) {
							var src = JSON.parse(this.response).thumbnail_large_url;
							setThumbnail(src);
						}
					};

					xhttp.open("GET", url, true);
					xhttp.send();
				},
				iframe : {
					allow : 'accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen;'
				},
				cookie : {
					name : 'cc_dailymotion'
				},
				languages : {
					'en' : {
						notice: 'This content is hosted by a third party. By showing the external content you accept the <a rel="noreferrer" href="#link_dailymotion" title="Terms and conditions" target="_blank">terms and conditions</a> of dailymotion.com.',
						loadBtn: 'Load video',
						loadAllBtn: 'Don\'t ask again'

					}
				}
			},
			"twitch" : {
				embedUrl: 'https://player.twitch.tv/?{data-id}&parent=localhost',
				iframe : {
					allow : 'accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen;',
					params: '',// optional
				},
				cookie : {
					name : 'cc_twitch'
				},
				languages : {
					'en' : {
						notice: 'This content is hosted by a third party. By showing the external content you accept the <a rel="noreferrer" href="#link_twitch" title="Terms and conditions" target="_blank">terms and conditions</a> of twitch.com.',
						loadBtn: 'Load stream',
						loadAllBtn: 'Don\'t ask again'
					}
				}
			},
			twitter : {

				onAccept: async (div, setIframe) => {
					const twttrLoaded = await CookieConsent.loadScript('https://platform.twitter.com/widgets.js');
					const twttrReady = twttrLoaded && await waitFor({type: 'script', obj: window, prop: 'twttr'});
					const tweet = twttrReady && await twttr.widgets.createTweet(div.dataset.id, div);
					tweet && setIframe(tweet.firstChild);
				},

				onReject: function(iframe){
					iframe.parentNode.remove();
				},

				cookie : {
					name : 'cc_twitter'
				},

				languages : {
					'en' : {
						notice: 'This content is hosted by a third party. By showing the external content you accept the <a rel="noreferrer" href="https://www.youtube.com/t/terms" title="Terms and conditions" target="_blank">terms and conditions</a> of twitter.com.',
						loadBtn: 'Load tweet',
						loadAllBtn: 'Don\'t ask again'
					}
				}
			},

			"facebook-post" : {
				embedUrl : 'https://www.facebook.com/plugins/post.php?{data-id}',

				iframe : {
					allow : 'accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen; web-share;',
					params: '',// optional
				},
				cookie : {
					name : 'cc_facebook_post'
				},
				languages : {
					'en' : {
						notice: 'This content is hosted by a third party. By showing the external content you accept the <a rel="noreferrer" href="#link_twitch" title="Terms and conditions" target="_blank">terms and conditions</a> of twitch.com.',
						loadBtn: 'Load post',
						loadAllBtn: 'Don\'t ask again'
					}
				}
			},

			googlemaps: {

				embedUrl: 'https://www.google.com/maps/embed?pb={data-id}',
				iframe: {
					allow : 'picture-in-picture; fullscreen;'
				},
				cookie: {
					name: 'cc_maps'
				},
				languages: {
					'en' : {
						notice: 'Notice message ...',
						loadBtn: 'Load map',
						loadAllBtn: 'Don\'t ask again'
					}
				}
			},

		}
	});


	var accept_all = document.getElementById('accept-all');
	var reject_all = document.getElementById('reject-all');

	accept_all.addEventListener('click', function(){
		console.log("clicked accept-all");
		manager.acceptService('all');
	});

	reject_all.addEventListener('click', function(){
		console.log("clicked reject-all");
		manager.rejectService('all');
	});
