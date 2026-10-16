// All copy mirrors the current ADVIO site (sparrowtv.ai). Edit text here.

export const img = (f: string) => `/images/${f}`;

export const home = {
  hero: {
    eyebrow: "Introducing Advio",
    title: "Unlock More Value From the Television You Already Deliver",
    body: "Advio connects broadcasters and distributors to unlock new advertising opportunities within existing television inventory. Powered by AdGlean, our technology identifies eligible impressions and enables more precise advertising, helping both sides generate incremental revenue.",
    ctas: [
      { label: "Explore the opportunity", href: "#who-we-help" },
      { label: "Schedule a working session", href: "/contact" },
    ],
    image: img("ChatGPT_Image_Jul_14_2026_05_57_31_PM.png"),
  },
  whoWeHelp: {
    eyebrow: "Who we help",
    title: "Two Sides of Television. One Shared Opportunity.",
    body: "Broadcasters and distributors each play a critical role in television advertising. Advio brings them together to create more value from the inventory already being delivered.",
    sides: [
      {
        eyebrow: "For broadcasters",
        title: "Make Your Existing Inventory More Valuable.",
        body: "Create new revenue opportunities from eligible out-of-target impressions while maintaining control of your inventory and protecting existing advertiser commitments.",
        cta: { label: "Broadcaster solutions", href: "/broadcasters" },
        image: img("Live_Broadcast_Control_Room.png"),
      },
      {
        eyebrow: "For distributors",
        title: "Unlock New Revenue Across Your Network.",
        body: "Participate in addressable advertising opportunities within the television you already deliver, with an approach designed to work alongside existing operations.",
        cta: { label: "Distributor solutions", href: "/distributors" },
        image: img("Futuristic_Media_Distribution_Hub.png"),
      },
    ],
  },
  linear: {
    eyebrow: "Why linear still matters",
    title: "Linear Television Still Delivers Audiences That Matter",
    body: "From live sports and local news to political advertising and major cultural events, linear television remains an important way for advertisers to reach engaged audiences at scale.",
    body2: "These environments represent valuable advertising inventory and an opportunity to generate more value from every impression.",
    items: [
      { name: "Live Sports", body: "Delivers unmatched reach through appointment viewing", image: img("livesports.jpg"), icon: img("15_f195b592-04e2-47b2-97a8-4ba1cf75b67b.png") },
      { name: "Local News", body: "Trusted daily programming with deep community engagement", image: img("localnews.jpg"), icon: img("14_51c8af62-4230-40f0-b09a-8ec54a0b529e.png") },
      { name: "Political Advertising", body: "Reaches engaged audiences during important political moments.", image: img("politicaladvertising.jpg"), icon: img("16_f6940c3d-18ec-4768-9bf4-e0c231d75098.png") },
      { name: "Premium Live Events", body: "Cultural moments audiences still watch together", image: img("liveevents.jpg"), icon: img("17_01315d31-102c-4494-aa72-1ff77f37dac3.png") },
    ],
  },
  challenge: {
    eyebrow: "The challenge",
    title: "Not Every Household Matches the Advertiser's Intended Audience.",
    body: "The opportunity isn't more commercial time. It's capturing more value from impressions already being delivered.",
    images: [img("Traditional_TV_vs._Targeted_AdGlean.png"), img("adglean-comparison-abc.png")],
  },
  needed: {
    eyebrow: "Why AdGlean is needed",
    title: "Traditional Linear Advertising Wasn't Built for Household-Level Precision.",
    items: [
      { title: "Limited Addressability", body: "Much of traditional linear inventory cannot be dynamically targeted at the household level.", image: img("03d7f601-0b56-4649-ba65-7206c7e5fee3.png") },
      { title: "Limited Intelligent Decisioning", body: "Traditional systems lack the audience-level intelligence needed to identify and evaluate eligible advertising opportunities.", image: img("03d7f601-0b56-4649-ba65-7206c7e5fee3_06d0aad2-6f73-4ccc-a366-04506777a7b6.png") },
      { title: "Shifting Advertising Investment", body: "Advertisers increasingly prioritize targeting and measurement, creating pressure for linear television to offer more addressable solutions.", image: img("03d7f601-0b56-4649-ba65-7206c7e5fee3_8d6b9c8e-f042-4d9a-9640-cebc16440b84.png") },
    ],
  },
  solution: {
    eyebrow: "The solution",
    title: "Meet AdGlean.",
    subtitle: "Turn Overlooked Impressions Into New Advertising Opportunities.",
    body: "AdGlean is Advio's television advertising intelligence technology. It identifies eligible out-of-target impressions and supports intelligent advertising decisions, creating opportunities for more precise advertising and incremental revenue.",
    image: img("Audience_Analytics_on_the_Big_Screen.png"),
  },
  connection: {
    eyebrow: "The Advio connection",
    title: "Connecting the Television Ecosystem.",
    body: "Advio connects broadcaster inventory, AdGlean's advertising intelligence, and distributor delivery capabilities to create new opportunities from existing television impressions.",
    items: [
      { label: "Broadcasters", title: "Control the Inventory", body: "Contribute eligible advertising inventory while maintaining control of existing commitments.", image: img("Broadcast_Control_Room_with_Purple_Signal_Token_75841439-e91c-4c5d-85d2-2951f996ba63.png") },
      { label: "Advio + AdGlean", title: "Power the Intelligence", body: "Identify eligible impressions and support intelligent advertising decisions.", image: img("AI_Analytics_Dashboard_with_Purple_Emblem_783f0a39-22d6-4deb-aa48-98191a38ae8a.png") },
      { label: "Distributors", title: "Enable Addressable Delivery", body: "Support household-level advertising delivery and participate in new monetization opportunities.", image: img("Modern_Grayscale_Smart_Media_Room.png") },
    ],
  },
  advantage: {
    eyebrow: "The AdGlean advantage",
    title: "A Smarter Path to Higher Advertising Yield.",
    backdrop: img("Futuristic_Curved_Media_Wall.png"),
    items: [
      { title: "Unlock Inventory Value", body: "Identify eligible impressions that can become new advertising opportunities.", icon: img("21.png") },
      { title: "Protect Existing Commitments", body: "Preserve delivery to intended audiences, with the original advertisement as the fallback when no qualified replacement is available.", icon: img("22.png") },
      { title: "Create Incremental Revenue", body: "Generate additional monetization opportunities without adding more commercial minutes.", icon: img("23.png") },
      { title: "Expand Addressable Opportunities", body: "Bring inventory, intelligence, and delivery together to create more addressable advertising opportunities.", icon: img("24.png") },
    ],
  },
  howTeaser: {
    eyebrow: "How AdGlean works",
    title: "Intelligence That Finds Opportunity in Every Impression.",
    body: "AdGlean analyzes television advertising delivery to identify eligible impressions, evaluate audience opportunities, and support more precise advertising decisions.",
    body2: "Discover how AdGlean works behind the scenes to create additional advertising value while protecting existing commitments.",
    cta: { label: "Explore AdGlean technology", href: "/adglean" },
    image: img("Targeted_Advertising_in_the_Living_Room.png"),
  },
  steps: [
    { title: "Detect", body: "Identify eligible advertising impressions within existing television delivery." },
    { title: "Evaluate", body: "Evaluate audience information and determine whether a qualified advertising opportunity exists." },
    { title: "Protect or Replace", body: "Enable an approved alternative advertisement when eligible, with the original advertisement remaining the fallback." },
  ],
};

export const broadcasters = {
  hero: {
    eyebrow: "Broadcaster solutions",
    title: "Unlock More Revenue From the Television Inventory You Already Own.",
    body: "AdGlean helps broadcasters identify new revenue potential within existing television inventory while protecting advertiser commitments and maintaining inventory control.",
    cta: { label: "Discuss a broadcaster pilot", href: "/contact" },
    image: img("erik-mclean-U-Vu_r6qyyU-unsplash.jpg"),
  },
  untapped: {
    eyebrow: "The untapped value",
    title: "Not Every Household Is Part of the Advertiser's Intended Audience.",
    paragraphs: [
      "Traditional linear television delivers the same commercial to every household watching a program, even when some households fall outside the advertiser's intended audience.",
      "AdGlean identifies eligible out-of-target impressions that can create new addressable advertising opportunities, without adding more commercial minutes.",
      "Working with participating distributors, Advio connects eligible broadcaster inventory with household-level advertising opportunities through AdGlean.",
    ],
    image: img("apartment-life-B7FUVavJyfk-unsplash_1.jpg"),
  },
  advantage: {
    eyebrow: "The broadcaster advantage",
    title: "More Revenue Potential. Same Inventory Control.",
    backdrop: img("Live_Broadcast_Control_Room.png"),
    items: [
      { title: "Incremental Revenue", body: "Create additional monetization potential from impressions that have historically been difficult to monetize separately.", icon: img("25.png") },
      { title: "Protect Existing Commitments", body: "Preserve delivery to intended audiences, with the original advertisement remaining the fallback when no qualified replacement is available.", icon: img("22.png") },
      { title: "Maintain Inventory Control", body: "Retain control over eligible inventory and existing advertiser commitments.", icon: img("9_981b7f81-d264-4250-8d7b-54207fc95bc7.png") },
      { title: "Reach New Advertiser Demand", body: "Create opportunities for local, regional, and targeted advertisers to reach television audiences.", icon: img("4_c92f89e7-2598-4bec-ad7b-600434904229.png") },
      { title: "Better Audience Intelligence", body: "Gain greater visibility into eligible impressions, audience delivery, and potential monetization.", icon: img("12_fbd5c590-5f99-43d3-a4da-174acc589b91.png") },
    ],
  },
  start: {
    eyebrow: "Getting started",
    title: "Start Small. Prove the Economics. Then Scale.",
    body: "Every broadcaster's inventory, distribution environment, and advertising economics are different. We start by understanding your business, evaluating the potential value, and defining a practical path to deployment.",
    steps: [
      { title: "Understand Your Inventory", body: "Review existing advertising inventory, audience delivery, distribution environment, and business requirements.", image: img("thisisengineering-w_zE6qlkQKA-unsplash_3.jpg") },
      { title: "Evaluate the Value", body: "Identify potentially eligible impressions and model the economics using actual inventory and advertising data.", image: img("douglas-lopez-likFdgumjWM-unsplash_1_b8565f48-b52a-4523-bf29-8730b62bac19.jpg") },
      { title: "Validate Through a Pilot", body: "Explore a controlled deployment with agreed technical, operational, and commercial success criteria.", image: img("annie-spratt-QckxruozjRg-unsplash.jpg") },
    ],
  },
};

export const distributors = {
  hero: {
    eyebrow: "Distributor solutions",
    title: "Create New Revenue From Television Already Moving Through Your Network.",
    body: "Advio helps television distributors participate in new advertising revenue opportunities through AdGlean. By identifying eligible impressions and enabling more precise advertising, AdGlean creates new monetization potential within existing television delivery, without requiring distributors to own broadcaster inventory.",
    cta: { label: "Explore a distribution partnership", href: "/contact" },
    image: img("frederic-koberl-2836IR07ocg-unsplash.jpg"),
  },
  untapped: {
    eyebrow: "The untapped value",
    title: "Your Network Delivers Television. There's More Value to Capture.",
    paragraphs: [
      "Every day, distributors deliver television programming and advertising to households across their networks. Yet the advertising value of those impressions has traditionally been controlled and monetized primarily upstream.",
      "AdGlean identifies eligible out-of-target impressions that can become new addressable advertising opportunities. By connecting broadcaster inventory with distributor delivery capabilities, Advio creates a way for both sides to participate in incremental value from television already being delivered.",
    ],
    image: img("thisisengineering-w_zE6qlkQKA-unsplash_3.jpg"),
  },
  advantage: {
    eyebrow: "The distributor advantage",
    title: "New Advertising Economics. Built Around Your Existing Network.",
    backdrop: img("Futuristic_Media_Distribution_Hub.png"),
    items: [
      { title: "Incremental Distributor Revenue", body: "Create new revenue potential from eligible advertising impressions delivered through your network.", icon: img("1_0d017c78-25f6-4005-bb6a-77a1b50977d8.png") },
      { title: "New Addressable Inventory", body: "Participate in newly created addressable advertising opportunities without owning or controlling broadcaster inventory.", icon: img("21_7c6bf991-c431-4f05-9b8c-48b2f3e02ed3.png") },
      { title: "Designed for Existing Operations", body: "Explore addressable advertising capabilities designed to work with existing television delivery environments.", icon: img("Untitled_1200_x_1200_px_-2.png") },
      { title: "Expand Addressable Capabilities", body: "Support more precise household-level advertising and create new opportunities for targeted advertiser demand.", icon: img("4_c92f89e7-2598-4bec-ad7b-600434904229.png") },
      { title: "Scale With Broadcaster Participation", body: "As more broadcasters participate, additional eligible inventory may become available across your distribution footprint.", icon: img("24_8425f8c8-ee56-4371-928f-5c118a50b116.png") },
    ],
  },
  start: {
    eyebrow: "Getting started",
    title: "Your Network. New Revenue Potential. A Clear Path Forward.",
    body: "Every distribution network is different. We start by understanding your delivery environment, evaluating potential advertising value, and identifying a practical approach to testing AdGlean within your existing operations.",
    steps: [
      { title: "Understand Your Network", body: "Review your television delivery environment, audience capabilities, advertising infrastructure, and operational requirements.", image: img("thisisengineering-w_zE6qlkQKA-unsplash_3.jpg") },
      { title: "Evaluate the Value", body: "Identify potential addressable advertising opportunities and model the economics using your network and relevant advertising data.", image: img("douglas-lopez-likFdgumjWM-unsplash_1_b8565f48-b52a-4523-bf29-8730b62bac19.jpg") },
      { title: "Validate Through a Pilot", body: "Explore a controlled pilot with agreed technical, operational, and commercial goals before considering a broader rollout.", image: img("annie-spratt-QckxruozjRg-unsplash.jpg") },
    ],
  },
};

export const adglean = {
  hero: {
    eyebrow: "Introducing AdGlean",
    title: "The Intelligence Behind More Valuable Television Advertising.",
    body: "AdGlean analyzes television advertising delivery to identify eligible impressions, evaluate audience opportunities, and enable more precise advertising decisions.",
    cta: { label: "See how AdGlean works", href: "#how" },
    image: img("Futuristic_Curved_Media_Wall.png"),
  },
  how: {
    eyebrow: "How AdGlean works",
    title: "From Detection to Delivery.",
    body: "AdGlean evaluates television advertising impressions to identify when an eligible opportunity exists and whether an approved replacement advertisement can be delivered.",
    steps: [
      { n: "01", title: "Detect", body: "Identify when an advertisement is playing within the television feed.", icon: img("28.png") },
      { n: "02", title: "Decide", body: "Evaluate the household against the original advertiser's intended audience and determine whether an eligible replacement opportunity is available.", icon: img("29.png") },
      { n: "03", title: "Protect or Replace", body: "Keep the original advertisement in place for its intended audience, or enable an approved alternative for an eligible out-of-target household.", icon: img("30.png") },
    ],
  },
  path: {
    eyebrow: "What happens to an impression?",
    title: "Every Impression Follows a Clear Path.",
    body: "AdGlean evaluates each impression in real time and takes the right action based on audience eligibility and available demand. The original advertisement always remains the fallback.",
    image: img("Neon_Ad_Impression_Routing_Flowchart.png"),
    imageMobile: img("Neon_TV_Ad_Decision_Flowchart.png"),
  },
  safeguards: {
    eyebrow: "Built to protect what works",
    title: "Advanced Intelligence. Real-World Safeguards.",
    body: "AdGlean is designed to create new advertising opportunities while preserving the foundations of existing television advertising.",
    items: [
      { title: "Advertiser Protection", body: "Original advertisements continue reaching their intended audiences.", icon: img("30_07dbe075-23e0-490b-8b87-60e96e969004.png") },
      { title: "Broadcaster Control", body: "Participating inventory is authorized and defined by broadcasters.", icon: img("31_83a66aa8-d5ec-46a7-8559-2862587d0411.png") },
      { title: "Eligibility Safeguards", body: "Replacement opportunities are evaluated against approved eligibility criteria.", icon: img("32_a838da0e-bf36-4f05-afea-27d7efa659cc.png") },
      { title: "Designed for Existing Delivery", body: "The approach works within existing commercial breaks and is evaluated against each partner's technical and operational requirements.", icon: img("33_544946c9-4b92-49df-bf7d-d6fabf45a8b3.png") },
    ],
  },
  fits: {
    eyebrow: "How Advio fits into television delivery",
    title: "Better together.",
    body: "Broadcasters and distributors each bring something the other needs. Advio connects them so both grow.",
    nodes: [
      {
        id: "broadcasters" as const,
        label: "Broadcasters",
        image: img("frederic-koberl-2836IR07ocg-unsplash.jpg"),
        brings: "Premium live inventory, authorized by the network.",
        gets: "More value from the commercials you already air.",
      },
      {
        id: "advio" as const,
        label: "Advio + AdGlean",
        brings: "The intelligence that matches each impression to the right household.",
        gets: "A shared model where every partner wins and the original commitment is protected.",
      },
      {
        id: "distributors" as const,
        label: "Distributors",
        image: img("apartment-life-B7FUVavJyfk-unsplash_1.jpg"),
        brings: "Household-level delivery across your footprint.",
        gets: "New revenue from the network you already run.",
      },
    ],
  },
};

export const leadership = {
  title: "Leadership",
  body: "Meet the entrepreneurs, technologists, and media executives behind Advio. Our leadership team brings together decades of experience in networking, television, advertising technology, and media distribution, combining deep industry expertise with a shared focus on creating new value across the television ecosystem.",
  groups: [
    {
      name: "Founding Members",
      people: [
        {
          name: "Drew Major",
          photo: img("images_8f38879f-29a3-4a8b-8b85-8dc6152e1297.jpg"),
          role: "Founding Member",
          bio: [
            "Drew Major is a pioneering technologist whose innovations have helped define modern networking, streaming, and television. As the lead architect of Novell NetWare, he built one of the world's most influential networking platforms.",
            "He later founded Move Networks (acquired by EchoStar) and Arroyo Video Solutions (acquired by Cisco), pioneering HTTP adaptive bitrate streaming, cloud DVR, and the first dynamic ad insertion for live streaming on ESPN. He also helped launch Sling TV. Today, Drew is applying decades of innovation to solve one of linear television's biggest advertising challenges through AdGlean.",
          ],
        },
        {
          name: "Jorg Nonnenmacher",
          photo: img("1606833500948.jpg"),
          role: "Founding Member",
          bio: [
            "Jorg Nonnenmacher is a media technology executive with more than 25 years of experience driving innovation for broadcasters and media distributors worldwide. He has founded, led, and successfully exited multiple technology companies through acquisitions by Nasdaq-listed organizations, and has held executive leadership roles at DISH, Alcatel-Lucent, and Bell Labs.",
            "Throughout his career, Jorg has helped advance video delivery, cloud technologies, and broadcast innovation. Today, he is applying that expertise to help transform the future of linear television advertising through AdGlean.",
          ],
        },
      ],
    },
    {
      name: "Operating Team",
      people: [
        { name: "Lewis Rife",
          photo: img("1575919411901.jpg"), role: "CFO / COO", bio: ["Finance and operations executive with leadership experience spanning high-growth startups and established brands, including MedCo, Stumptown Coffee, and Viewpoint (acquired by Trimble). Lewis specializes in scaling organizations and driving operational excellence."] },
        { name: "Gazit Ovadia",
          photo: img("unnamed-1.jpg"), role: "Founding Member & CPO", bio: ["AdTech executive with expertise spanning demand-side, supply-side, retail media, and audience data. Built and scaled Rakuten Advertising's ad exchange and retail media businesses, increasing monthly revenue 55× in two years, with previous product and engineering leadership roles at Sizmek, Peer39, and Verint."] },
        {
          name: "Brandon Rockwood",
          photo: img("brandon-rockwood.jpg"),
          role: "Head of Business Development",
          bio: [
            "Business development and sales executive with more than 15 years of experience building revenue systems, sales teams, and strategic partnerships. Former Vice President of Business Strategy at Alder Holdings and President of Sorce Energy Solutions, with 2016 Gold and Silver Stevie Awards for sales and customer service. Brandon leads partnerships with media companies, sports organizations, and distributors.",
          ],
        },
        { name: "Garrett Daw",
          photo: img("1783531196019.png"), role: "Head of Corporate Development", bio: ["Entrepreneur and media executive with a track record of building and scaling technology companies. Founder and CEO of Lyfe Communications and sales leader at USDTV, one of the first U.S. OTT platforms, helping drive early innovation in digital television."] },
        {
          name: "Ed Galbraith",
          photo: img("ed-galbraith.jpg"),
          role: "VP of Engineering",
          bio: [
            "Technology and engineering executive specializing in streaming media, software development, and regulatory compliance. Previously held leadership roles at Pluto TV, Dish Network, and Property Solutions International, with expertise spanning streaming infrastructure, intellectual property, licensing, and technology strategy. Ed brings a strong combination of technical and legal expertise to Advio's advertising technology platform.",
          ],
        },
      ],
    },
    {
      name: "Industry Advisors",
      people: [
        { name: "Wil Danielson",
          photo: img("1517604157837.jpg"), role: "Industry Advisor", bio: ["Media and ad sales executive with deep expertise in local, national, and digital advertising. Led strategic sales initiatives at Tribune Media and The Hill, with successful exits including LKQD and Covers.com."] },
        { name: "Dave Berman",
          photo: img("1516188162476.jpg"), role: "Industry Advisor", bio: ["Veteran media executive with extensive experience creating, distributing, and monetizing content across television and digital platforms. Former leadership roles include CBS, PanAmSat, and Major League Gaming."] },
      ],
    },
  ],
};

export const contact = {
  title: "Contact",
  body: "Whether you're a broadcaster, distributor, or strategic partner, we'd love to learn more about your business and discuss opportunities to create additional value through AdGlean.",
};
