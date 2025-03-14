const accessToken = 'BQAm85KIZTs8a3BZShNFHDjl8QpUJLPxdz-_vBJnJcMbyFnq7Ky0ueABTMyvMGllFZhbUlIMj6qBCPjerC764xp9mxWX2rCcx7zVwWT9fzhKWZ3EFfg5I-NG71NOZeLLV6rr6Q0r9M8'; 

       async function searchPlaylists() {
           const country = document.getElementById("country").value.trim();


           if (!country) {
               alert("Please enter a country name.");
               return;
           }


           const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(country)}&type=playlist&limit=5`;


           try {
               const response = await fetch(url, {
                   method: 'GET',
                   headers: {
                       'Authorization': `Bearer ${accessToken}`,
                       'Content-Type': 'application/json'
                   }
               });


               const data = await response.json();
               console.log(data);


               if (response.ok) {
                   // Embed the playlists
                   displayPlaylistsAndEmbed(data.playlists.items);
               } else {
                   alert("Error fetching playlists: " + (data.error.message || response.statusText));
               }
           } catch (error) {
               console.error("Error:", error);
               alert("An error occurred while fetching the playlists.");
           }
       }


       function displayPlaylistsAndEmbed(playlists) {
           const playlistsContainer = document.getElementById("playlists");
           playlistsContainer.innerHTML = "";


           if (!playlists || playlists.length === 0) {
               playlistsContainer.innerHTML = "<p>No playlists found for this country.</p>";
               return;
           }


           playlists.forEach((playlist) => {
          
               if (playlist && playlist.id) {
                   const playlistContainer = document.createElement('div');
                   playlistContainer.classList.add('embed-container');


                  
                   const iframe = document.createElement('iframe');
                   iframe.src = `https://open.spotify.com/embed/playlist/${playlist.id}`;
                   iframe.allow = "encrypted-media";
                   playlistContainer.appendChild(iframe);


                  
                   playlistsContainer.appendChild(playlistContainer);
               } else {
                   console.log("Invalid playlist:", playlist);
               }
           });
       }