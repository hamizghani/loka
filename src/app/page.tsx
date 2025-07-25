'use client';

import { useState } from 'react';
import Post from '@/components/Post';
import GlassmorphSearchBar from '@/components/GlassmorphSearchBar';
import UserSuggestion from '@/components/Profileholder1';
import TweetComposer from '@/components/TweetComposer';
import { PostType } from '@/types/index'; // Import the updated PostType
import Image from 'next/image';

// Sample data for the "For You" carousel
const forYouItems = [
    {
        id: 1,
        title: "Ethnicity",
        description: "Explore Indonesia’s rich tapestry of over 1,300 ethnic groups and their unique customs.",
        image: "/images/image21.png" // Remove leading slash to fix image path
      },
      {
        id: 2,
        title: "Food",
        description: "Savor the diverse flavors of Indonesian cuisine, from fiery rendang to sweet klepon.",
        image: "/images/image22.png"
      },
      {
        id: 3,
        title: "Language",
        description: "Discover the 700+ regional languages that shape Indonesia’s cultural identity.",
        image: "/images/image23.png"
      },
      {
        id: 4,
        title: "Clothing",
        description: "Admire traditional attire like Batik, Kebaya, and Ulos that reflect local artistry.",
        image: "/images/image24.png"
      },
      {
        id: 5,
        title: "Festival",
        description: "Join vibrant celebrations such as Nyepi, Galungan, and Tabuik that unite communities.",
        image: "/images/image25.png"
      },
      {
        id: 6,
        title: "Religion",
        description: "Navigate Indonesia’s islands and provinces, each boasting distinct landscapes and traditions.",
        image: "/images/image26.png"
      },
];

// Updated initial posts data to match the PostType interface
const initialPosts: PostType[] = [
    {
        id: 1,
        avatar: "/images/image1.png",
        username: "Gung",
        handle: "gung",
        timestamp: "Jul 25",
        content: 
    `I’m Gung, a Balinese from Gianyar. Every Galungan, our village transforms into a sea of gold and white: tall bamboo poles called “penjor” line the streets, each draped with young coconut leaves, rice, and sweet cakes. As a child, I remember weaving my first penjor with my grandmother under the hot midday sun. The rhythmic sway of those poles in the breeze felt like the heartbeat of our faith, reminding us that the ancestors have returned to Earth to bless us.
    
    By midday, families gather at the pura (temple) in their finest kebaya and udeng, offering canang sari—small palm‑leaf baskets filled with flowers, fruit, and incense. I carry my own offering, hands trembling as I place it at the shrine. The air fills with the scent of frangipani and cempaka, and the ringing of gamelan sets a meditative tempo. Sharing food and laughter with neighbors afterward binds us together, even as young Balinese drift to cities far away.
    
    Galungan’s last day, Kuningan, arrives ten days later. We return to the temple before dawn, carrying fresh offerings to thank the gods and ancestors for their blessings. Standing there in the cool light, I feel both humbled and empowered—connected to generations past and hopeful for Bali’s future. Each year, I vow to keep these traditions alive, to teach my children the meaning behind every ritual, so that Balinese culture remains as vibrant as the penjor that decorate our streets.`,
        replies: 14,
        retweets: 5,
        upvotes: 320,
        downvotes: 4,
        views: 4800,
        isVerified: true,
      },
      {
        id: 2,
        avatar: "/images/image2.png",
        username: "Hamiz Ghani",
        handle: "hamizghani",
        timestamp: "Jul 24",
        content:
    `I’m Hamiz, an Acehnese from Banda Aceh. Last week I joined a Saman dance workshop to celebrate Maulid Nabi. In a dim village hall, twenty of us sat cross‑legged on the floor, our palms raised in prayer. When the ustadz finished reciting, the leader signaled the beat—and suddenly, synchronized claps echoed like rolling thunder. I’d practiced alone at home, but this was on another level: the dancers responded to each other without a single misstep.
    
    That afternoon, sweat dripped down my face as I matched each clap, each stomp, each turn, trying to keep pace. Our voices rose in chorus when the rhythm built, echoing off wooden walls and banana‑leaf ceilings. Watching the older men’s expressions of devotion, I realized Saman is more than a performance—it’s a communal prayer, a reminder that our faith binds us tighter than blood.
    
    Afterwards, we broke bread together: sweet pulut with serikaya, steaming coffee, and laughter. I left with callused palms and a full heart, determined to teach Saman to my younger cousins. In a world where traditions fade, I carry this dance in my skin, so that Acehnese youth remember the power of unity through rhythm.`,
        image: "/images/image31.png",
        replies: 8,
        retweets: 2,
        upvotes: 210,
        downvotes: 1,
        views: 2700,
        isVerified: false,
      },
      {
        id: 3,
        avatar: "/images/image3.png",
        username: "Siti Rahma",
        handle: "sitirahma",
        timestamp: "Jul 23",
        content:
    `I’m Siti, a Minangkabau from Padang. Our culture centers on the rumah gadang—those graceful longhouses where the roof curves like buffalo horns. Growing up, my mornings began with sunlight filtering through carved wood, dust motes dancing above polished floors. My mother taught me the significance of each motif: the floral patterns symbolizing fertility, the geometric lines representing courage, and the buffalo horns reminding us of our matriarchal roots.
    
    Last month, I returned for a family reunion. Three generations worked side by side to restore the wooden panels, sanding away decades of wear. Each stroke felt like a meditation, a chance to honor the women who guide our clan. On the final day, we held a rite of passage ceremony for my cousin’s daughter—she stepped across the threshold, her fingers tracing the carved designs as elders sang ancient lullabies. Tears sprung in my eyes: here was our past, present, and future intertwined in one magnificent house.
    
    As I boarded the bus back to the city, I carried a small wood chip—the memory of every hand that shaped it. In Jakarta’s hustle, I struggle to find that same sense of belonging, but each time I wear my songket shawl or share stories of our gadang, I feel home again. I promise to teach my friends the meaning behind each carving, so that Minangkabau culture remains a living legacy.`,
        replies: 11,
        retweets: 3,
        upvotes: 290,
        downvotes: 2,
        views: 5500,
        isVerified: true,
      },
      {
        id: 4,
        avatar: "/images/image4.png",
        username: "Putri Sari",
        handle: "putrisari",
        timestamp: "Jul 22",
        content:
    `I’m Putri, a Javanese from Yogyakarta. Each dawn, the soft clatter of gamelan notes drifts across the palace courtyards, beckoning me into a world of history and harmony. I grew up beneath towering teak doors at the Kraton, where coronations still echo across marble floors. My first gamelan lesson arrived at age five, fingertips tracing bronze keys under my teacher’s patient guidance. The structured rhythms taught me discipline; the flowing melodies taught me to listen—to elders, to ancestors, and to my own heart.
    
    When I joined a batik workshop near Imogiri, I learned that every motif is a story: the parang symbol for strength, kawung for purity, and ceplok for fertility. For a week, I sat beside master dyers, plunging cloth into vats of indigo and soga, then painstakingly applying wax with a canting pen. My hands stained blue and brown, I realized batik isn’t decoration—it’s a visual diary of Javanese values passed down by mothers and grandmothers.
    
    Last month, I draped my own batik shawl in the Kraton courtyard under twilight lanterns. Elders paused their practice to admire my work, offering guidance and blessings. In that moment, I felt the weight of history on my shoulders—and the freedom to shape its future. I vow to teach batik and gamelan to the children in Jakarta, so that Yogyakarta’s living arts survive in the hands of a new generation.`,
        replies: 9,
        retweets: 3,
        upvotes: 280,
        downvotes: 2,
        views: 5200,
        isVerified: true,
      },
      {
        id: 5,
        avatar: "/images/image5.png",
        username: "Asep Haryadi",
        handle: "asepharyadi",
        timestamp: "Jul 21",
        content:
    `I’m Asep, a Sundanese from Bandung. Growing up in the shadow of Mount Tangkuban Perahu, I learned to play angklung as part of my school’s evening routines. That first lesson, I shook my bamboo tubes alongside classmates—each instrument a single note in a larger melody. The unity of sound reminded me that our community thrives on collaboration.
    
    Last weekend, I led an angklung workshop for city kids. They arrived skeptical, unsure how bamboo tubes could become an orchestra. But as we practiced pelog scales, the room filled with laughter and surprise. Parents watched from doorways, eyes shining with pride at their children’s discovery of a centuries‑old art.
    
    After the session, we shared karedok and tea beneath the palms. I saw how music can bridge generations and backgrounds, bringing people together in harmony. I’ll continue hosting these workshops, hoping that Sundanese heritage echoes beyond Bandung into the hearts of urban youth.`,
        image: "/images/image32.png",
        replies: 6,
        retweets: 2,
        upvotes: 230,
        downvotes: 1,
        views: 4100,
        isVerified: false,
      },
      {
        id: 6,
        avatar: "/images/image6.png",
        username: "Debora Silalahi",
        handle: "deborasilalahi",
        timestamp: "Jul 20",
        content:
    `I’m Debora, a Batak from Medan. When I first heard gondang, the traditional Batak drum ensemble, I felt my chest vibrate in time with the deep gendang beat. My grandmother took me to a village ceremony where dancers in ulos shawls circled the gong, honoring ancestors who paved our way.
    
    I learned to sing Hasapi songs beside Lake Toba’s misty shores. Each lyric spoke of love and loss, of resilience against volcanic winds. As I tried to match my voice with elders’, I understood that music is our communal memory, passed from voices to hearts.
    
    Now living in Jakarta, I host small gondang gatherings on weekends. I invite fellow Batak youth to drum, sing, and share ulos. Through these sessions, we reclaim a piece of home—reminding ourselves and others that Batak culture lives on, not just in museums but in our voices and hands.`,
        replies: 5,
        retweets: 1,
        upvotes: 190,
        downvotes: 0,
        views: 3800,
        isVerified: false,
      },
      {
        id: 7,
        avatar: "/images/image7.png",
        username: "Rudi Pratama",
        handle: "rudipratama",
        timestamp: "Jul 19",
        content:
    `I’m Rudi, a Betawi from Jakarta. Last month I joined a Palang Pintu ceremony—a ritual wedding gate cleansing where dancers in colorful costumes move to the beat of tanjidor brass bands. The music blended European and Malay influences, reflecting Betawi’s melting‑pot identity.
    
    I danced alongside friends, weaving through banana‑leaf arches decorated with orchids and jasmine. As we stamped our feet in unison, I felt the rhythm connect me to ancestors who once greeted traders and conquerors on Java’s northern coast. Each step was a celebration of resilience and inclusion.
    
    Afterwards, elders served kerak telor and kopi tubruk in the courtyard. I snapped photos and recorded stories to preserve this ritual for future generations. Betawi heritage may seem buried beneath skyscrapers, but in every drumbeat and incense waft, our identity endures.`,
        replies: 8,
        retweets: 3,
        upvotes: 240,
        downvotes: 3,
        views: 4500,
        isVerified: true,
      },
      {
        id: 8,
        avatar: "/images/image8.png",
        username: "Martha Wanggai",
        handle: "marthawanggai",
        timestamp: "Jul 18",
        content:
    `I’m Martha, a Papuan from Jayapura. In my village, the Horja dance unites clans under the morning sun. Drummers strike kanda drums while dancers in feathered headdresses move with animal grace, embodying rainforest spirits.
    
    Last harvest season, I joined my uncle’s group. We painted our faces with red and white clay, symbolizing blood and bone. Our steps honored ancestors who taught us to live in harmony with the land. As I leaped forward, I felt the power of community coursing through me.
    
    At dusk, we feasted on sago porridge and roasted cassava around a bonfire. Elders told creation stories under starlight. I carried those tales back to the city, determined to share Papua’s rich heritage with friends who’ve never seen beyond skyscrapers.`,
        replies: 7,
        retweets: 2,
        upvotes: 260,
        downvotes: 2,
        views: 4800,
        isVerified: true,
      },
      {
        id: 9,
        avatar: "/images/image9.png",
        username: "Ilham Faisal",
        handle: "ilhamfaisal",
        timestamp: "Jul 17",
        content:
    `I’m Ilham, a Bugis from Makassar. Last week, I sailed on a phinisi boat replica to honor maritime ancestors. The wood planks, carved by hand, creaked as sails caught the sea breeze—just as they did centuries ago when Bugis traders connected islands.
    
    On deck, I helped raise the tanja sail, feeling each knot and rope like a pulse linking me to generations of sailors. We navigated by stars and swells, guided by maps etched in memory. In the evening, elders sang ballads of voyages that shaped Sulawesi’s destiny.
    
    Returning to port at sunrise, I felt renewed purpose. I plan to build a youth program teaching phinisi carpentry and navigation—so that Bugis seafaring skills stay alive, not just as history, but as living practice on our waters.`,
        replies: 4,
        retweets: 1,
        upvotes: 170,
        downvotes: 1,
        views: 2900,
        isVerified: false,
      },
      {
        id: 10,
        avatar: "/images/image10.png",
        username: "Siti Kholifah",
        handle: "sitikholifah",
        timestamp: "Jul 16",
        content:
    `I’m Siti, a Madurese from Pamekasan. Each year we race karapan sapi—bulls adorned with bright tassels and bells thunder across the sand as jockeys urge them forward. I still remember the first time I heard the crowd roar as hooves kicked up dust.
    
    Last Sunday, I led a youth team. My heart pounded as our bulls lunged ahead, necks straining against bridles. The smell of sweat and sand mixed with cheering voices. Crossing the finish line, legs shaking, I felt both exhaustion and triumph.
    
    Afterward, we celebrated with sate madura and palm wine. I told my teammates that this race isn’t just sport—it’s a rite of passage, a reminder of our island’s spirit. I’ll keep training young riders so that karapan sapi remains Madura’s heartbeat.`,
        replies: 3,
        retweets: 1,
        upvotes: 140,
        downvotes: 1,
        views: 2100,
        isVerified: false,
      },
      {
        id: 11,
        avatar: "/images/image11.png",
        username: "Hendra Putra",
        handle: "hendraputra",
        timestamp: "Jul 15",
        content:
    `I’m Hendra, a Dayak from Pontianak. In my tribe, we carve mandau blades with intricate motifs symbolizing rivers and forests. Each carving tells a story—of hunts, of seasons, and of ancestors guiding our path.
    
    Last month, I apprenticed under a master carver. With each stroke of the chisel, I felt the wood yield stories older than memory. My hands blistered, but I pressed on, knowing that learning mandau craft means learning our very identity.
    
    Now, I teach carving classes to urban students. As they shape wood and hear tales of Dayak lore, I see their eyes light up. Through these workshops, I ensure that our ancestral skills continue, not as relics, but as living art in a changing world.`,
        replies: 10,
        retweets: 4,
        upvotes: 300,
        downvotes: 2,
        views: 7500,
        isVerified: true,
      },
      {
        id: 12,
        avatar: "/images/image12.png",
        username: "Ferry Sangallo",
        handle: "ferrysangallo",
        timestamp: "Jul 14",
        content:
    `I’m Ferry, a Torajan from Rantepao. During Ma’Nene, we honor our ancestors by exhuming their mummified remains for cleaning and redressing. It sounds eerie, but it’s a profound act of love: families dust off bones, replace sarongs, and share memories.
    
    Last week, I helped my aunt gently brush centuries‑old cloth from a great‑grandfather’s skull, then laid fresh flowers beside his tomb. Grandparents sang reels of stories—how he farmed rice terraces carved into mountainsides. I felt both sorrow and deep gratitude.
    
    As we reburied the coffin, I vowed to record these stories for future generations. I want Toraja youth to understand that life and death link us in a cycle of care, and that every ancestor deserves remembrance.`,
        replies: 6,
        retweets: 2,
        upvotes: 220,
        downvotes: 2,
        views: 4300,
        isVerified: false,
      },
      {
        id: 13,
        avatar: "/images/image13.png",
        username: "Linda Tambunan",
        handle: "lindatambunan",
        timestamp: "Jul 13",
        content:
    `I’m Linda, a Minahasa from Manado. On thanksgiving Day, our families feast on tumpi—rice cones surrounded by dishes like ayam rica and dabu‑dabu chili sauce. My mother’s table is a riot of color and spice, symbolizing gratitude and abundance.
    
    This year, I hosted a potluck for friends from Java, Bali, and Aceh. They tasted sambal cakalang and laughed as they learned to shape tumpi with their hands. Their eyes widened at our flavors—tangy, fiery, sweet—all at once.
    
    Afterward, we sang traditional waruga songs around the piano. Their voices mingled with mine, proving that Minahasa hospitality can bridge any background. I’ll keep inviting new friends, so our culinary heritage lives beyond North Sulawesi.`,
        replies: 5,
        retweets: 2,
        upvotes: 180,
        downvotes: 1,
        views: 3100,
        isVerified: false,
      },
      {
        id: 14,
        avatar: "/images/image14.png",
        username: "Arman Syah",
        handle: "armansyah",
        timestamp: "Jul 12",
        content:
    `I’m Arman, a Banjarese from Banjarmasin. At our floating market, women in colorful kebaya barter fruits and soto banjar from small sampans. The early‑morning mist glows pink as lanterns guide boats along narrow canals.
    
    I spent last Sunday navigating my own boat laden with rambai and wajik. I haggled over price with neighboring traders, then shared hot soto as sunrise painted the sky. Each exchange felt like a dance, rooted in centuries of river trade.
    
    When I returned home, I wrote a blog post and shared photos. Replies from readers far away showed me that Banjarese life, shaped by water, can flow into the hearts of anyone willing to listen.`,
        replies: 7,
        retweets: 3,
        upvotes: 250,
        downvotes: 3,
        views: 5400,
        isVerified: true,
      },
      {
        id: 15,
        avatar: "/images/image15.png",
        username: "Dewi Kusuma",
        handle: "dewikusuma",
        timestamp: "Jul 11",
        content:
`I’m Dewi, a Tenggerese from Mount Bromo. Each year, during the Kasada festival, my family makes offerings of rice, flowers, and livestock—tossing them into the volcano crater to thank the gods for protection.

Last Kasada, I joined the night climb with my father. The cold wind bit our faces as we reached the rim. By torchlight, I dropped a basket of jasmine petals into the glowing abyss, whispering prayers for our ancestors.

As dawn broke, we danced in traditional Tenggerese attire—bright shawls and silver ornaments sparkling in sunlight. The ceremony reminded me that even amid modern Java, sacred mountains hold our stories.`,
        image: "/images/image34.png",
        replies: 4,
        retweets: 1,
        upvotes: 160,
        downvotes: 1,
        views: 2600,
        isVerified: false,
      },
      {
        id: 16,
        avatar: "/images/image16.png",
        username: "Kevin Tan",
        handle: "kevintan",
        timestamp: "Jul 10",
        content:
    `I’m Kevin, a Chinese‑Indonesian from Glodok, Jakarta’s Chinatown. During Imlek, red lanterns sway over narrow alleys, and lion dances thunder through the streets. I’ve celebrated this festival since I was a boy, pounding on drums and shaking cymbals in the parade.
    
    This year, I helped my aunt prepare thousand paper money and oranges for the visiting elders. We knelt before family altars, bowing with incense smoke swirling around us. Each ritual bond reminded me of roots that span oceans.
    
    After lion dances, we shared kue keranjang and laughter in grandmother’s courtyard. I’ll teach my children these customs, so that our Chinese‑Indonesian tapestry remains vivid in Jakarta’s mosaic.`,
        replies: 3,
        retweets: 1,
        upvotes: 120,
        downvotes: 2,
        views: 1800,
        isVerified: false,
      },
      {
        id: 17,
        avatar: "/images/image17.png",
        username: "Nur Aisyah",
        handle: "nuraisyah",
        timestamp: "Jul 9",
        content:
    `I’m Nur, a Malay from Riau. Each evening, the plaint of gambus strings drifts from kampung homes as families gather for zapin dance. My mother taught me graceful steps—heel clicks and wrist flicks—synchronized to rhythmic drums.
    
    Last week, I performed at a beach festival. The golden sand lit up under lanterns as dancers in traditional kain batik swayed to seafaring melodies. Tourists paused, captivated by this blend of Arab and Malay heritage.
    
    Afterward, I hosted a small workshop, teaching zapin to interested teens. Watching them master each step, I felt hope that Riau’s coastal legacy continues to ripple through time.`,
        replies: 5,
        retweets: 2,
        upvotes: 200,
        downvotes: 3,
        views: 4000,
        isVerified: false,
      },
      {
        id: 18,
        avatar: "/images/image18.png",
        username: "Rizki Nur",
        handle: "rizkinur",
        timestamp: "Jul 8",
        content:
    `I’m Rizki, a Mandar from West Sulawesi. In my village, families gather each full moon to brew tuak, a palm wine, in bamboo vats. The process begins with tapping nipa palms at dawn and ends with communal toasts at dusk.
    
    Last month, I joined elders in pounding sago to feed the fermenting sap. Laughter echoed as we cracked jokes about last year’s batch. When the first sip went around, its sweet tang felt like our island’s spirit—warm, bold, communal.
    
    Now, I share tuak-making tutorials online, hoping young Mandar reconnect with this tradition. Each like and comment proves that even in cities, our island’s flavors can quench hearts far from home.`,
        replies: 2,
        retweets: 1,
        upvotes: 130,
        downvotes: 0,
        views: 1700,
        isVerified: false,
      },
      {
        id: 19,
        avatar: "/images/image19.png",
        username: "Amalia Umar",
        handle: "amaliaumar",
        timestamp: "Jul 7",
        content:
    `I’m Amalia, a Gorontalese from Gorontalo. Each July, we celebrate Tulude—dressing in bright silks and parading through streets to honor gratitude and forgiveness. As children, we twirled umbrellas adorned with jasmine, learning to respect our elders.
    
    This year, I choreographed a youth dance group. We practiced under coconut palms, perfecting each step that symbolizes blessings and mercy. The final performance before the sultan’s palace brought tears to many eyes—proof that culture can heal generational wounds.
    
    Afterwards, we feasted on labu siam curries and roasted fish. I’ll continue training young Gorontalese so Tulude’s spirit—of unity and compassion—lives on in every heart.`,
        replies: 4,
        retweets: 1,
        upvotes: 150,
        downvotes: 2,
        views: 2300,
        isVerified: false,
      },
      {
        id: 20,
        avatar: "/images/image20.png",
        username: "Bayu Nugroho",
        handle: "bayunugroho",
        timestamp: "Jul 6",
        content:
    `I’m Bayu, a Cirebonese from Cirebon. I grew up hearing tales of Sunan Gunung Jati and the Keraton Kasepuhan’s timeless architecture. Last month, I joined a guided night tour, lantern in hand, as a historian recounted ancient trade routes and mystic stories.
    
    We wandered through ornately carved gates and cloistered courtyards, each relief narrating episodes of cultural fusion—Chinese dragons, Hindu motifs, Islamic calligraphy. In that silent moonlit air, I felt history pulse beneath my feet.
    
    After the tour, I interviewed the sultan’s librarian for my blog. I hope my words encourage others to explore Cirebon’s layered heritage, so our city’s legacy remains as vibrant as its painted walls.`,
        replies: 6,
        retweets: 2,
        upvotes: 210,
        downvotes: 3,
        views: 5000,
        isVerified: true,
      },
    
];

export default function HomePage() {
  const [posts, setPosts] = useState<PostType[]>(initialPosts);
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);

  // This function creates a new post object with all the required fields
  const handleAddPost = (content: string) => {
    const newPost: PostType = {
      id: Date.now(), // Use a timestamp for a simple unique ID
      // This data should come from the currently logged-in user
      // Using placeholders for now:
      avatar: "https://pbs.twimg.com/profile_images/1668563583205257216/V65fj04d_400x400.jpg", 
      username: "vdel",
      handle: "yourhandle",
      isVerified: false, // Or true if the current user is verified
      //---------------------------------------------------------
      timestamp: new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(new Date()),
      content: content,
      // New posts always start with 0 stats
      replies: 0,
      retweets: 0,
      upvotes: 0,
      downvotes: 0,
      views: 0
    };

    // Add the new post to the beginning of the posts array
    setPosts([newPost, ...posts]);
  };

  // Function to get current carousel items (2 items at a time)
  const getCurrentCarouselItems = () => {
    const startIndex = currentCarouselIndex * 2;
    return forYouItems.slice(startIndex, startIndex + 2);
  };

  // Function to navigate carousel
  const nextCarouselSlide = () => {
    setCurrentCarouselIndex((prev) => 
      prev >= Math.ceil(forYouItems.length / 2) - 1 ? 0 : prev + 1
    );
  };

  const prevCarouselSlide = () => {
    setCurrentCarouselIndex((prev) => 
      prev <= 0 ? Math.ceil(forYouItems.length / 2) - 1 : prev - 1
    );
  };


  return (
    <div className="ml-20 flex">
        <div className="flex-3 h-screen bg-white">
            <GlassmorphSearchBar />
            <TweetComposer onPostSubmit={handleAddPost} />

            {/* Now we map over the posts and pass all the correct props */}
            <div className="flex flex-col">
              {posts.map((post) => (
                <Post
                  key={post.id}
                  avatar={post.avatar}
                  username={post.username}
                  handle={post.handle}
                  timestamp={post.timestamp}
                  content={post.content}
                  replies={post.replies}
                  retweets={post.retweets} // Pass retweets
                  upvotes={post.upvotes}
                  downvotes={post.downvotes}
                  views={post.views}
                  isVerified={post.isVerified} // Pass isVerified
                  image={post.image} // Pass image prop
                />
              ))}
            </div>
        </div>
        <div className="flex-2 flex h-screen flex-col bg-red-200">
        {/* For You section with carousel */}
        <div className="flex-1 border-b border-gray-300 bg-gray-100 flex flex-col">
          <h2 className="p-4 pb-2 text-xl font-bold text-gray-800">For You</h2>
          <div className="relative flex-1">
            <div className="h-full overflow-hidden">
              <div className="flex h-full gap-2 p-2">
                {getCurrentCarouselItems().map((item) => (
                  <div key={item.id} className="flex-1 rounded-lg overflow-hidden relative group cursor-pointer aspect-[4/3]">
                    {/* Black background behind the image */}
                    <div className="absolute inset-0 bg-black z-0"></div>
                    {/* Background Image with reduced opacity */}
                    <Image
                      src={item.image}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 z-10 opacity-60"
                    />
                    {/* Text Overlay */}
                    <div className="absolute inset-0 z-20 p-4 flex flex-col justify-end">
                      <h3 className="font-bold text-lg text-white mb-2 drop-shadow-lg">{item.title}</h3>
                      <p className="text-sm text-white text-opacity-90 drop-shadow-md">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Modern Navigation Buttons */}
            <button
              onClick={prevCarouselSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-40 hover:bg-opacity-60 text-red-600 rounded-full w-10 h-10 flex items-center justify-center shadow transition-all duration-200 z-30"
              aria-label="Previous"
            >
              {/* Left Arrow Icon */}
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextCarouselSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-40 hover:bg-opacity-60 text-red-600 rounded-full w-10 h-10 flex items-center justify-center shadow transition-all duration-200 z-30"
              aria-label="Next"
            >
              {/* Right Arrow Icon */}
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
        <div className="flex-1 bg-white p-4">
          <h2 className="mb-4 text-xl font-bold text-gray-800">People to Connect</h2>
          <div className="space-y-2">
            <UserSuggestion
              avatar="/images/image27.png"
              username="Sarah Chen"
              handle="sarahdesigns"
              verified={true}
            />
            <UserSuggestion
              avatar="/images/image1.png"
              username="Gung"
              handle="gung"
              verified={true}
            />
            <UserSuggestion
              avatar="/images/image5.png"
              username="Asep Haryadi"
              handle="asepharyadi"
            />
            <UserSuggestion
              avatar="/images/image3.png"
              username="Siti Rahma"
              handle="sitirahma"
              verified={true}
            />
            <UserSuggestion
              avatar="/images/image2.png"
              username="Hamiz Ghani"
              handle="hamizghani"
            />
          </div>
        </div>
      </div>
    </div>
  );
}