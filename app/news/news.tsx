/* eslint-disable react/no-unescaped-entities */
"use client"

import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ChevronDown, ChevronUp, Menu } from 'lucide-react'
import { Inter } from 'next/font/google'
import { useState, useEffect } from 'react'

const inter = Inter({ subsets: ['latin'] })

// Pour le balisage: **gras** __grand__ *italique*
// TODO : think about another way to handle news to make it easier for Christophe to add news (maybe pull them from a JSON file ?)
const newsItems = [
	{
		id: 12,
		date: "Dec 2024",
		title: "Altwy appoints Peter Mahlmeister as Chief Strategy Officer",
		contentType: "text",
		content: `Altwy is pleased to announce the **appointment of Peter Mahlmeister** as **Chief Strategy Officer (CSO)**. With over 30 years of experience in the IT industry, Peter will play a critical role in shaping Altwy’s strategic direction and driving its next phase of growth.

Peter’s career spans a range of leadership roles at major technology companies, including Silicon Graphics/SGI, HPE, and NetApp, as well as innovative startups such as Tintri, SimpliVity, and Cohesity. His extensive knowledge of the IT ecosystem and his forward-thinking perspective will bring invaluable insights to Altwy.

**Christophe Lambert**, CEO of Altwy, expressed his enthusiasm for Peter’s arrival:
"I am delighted to welcome Peter to Altwy. Having had the privilege of working with him for over 20 years, I know firsthand the value of his strategic mindset and collaborative approach. Peter’s expertise will be a tremendous asset as we continue to scale and achieve our ambitious goals.”
Peter Mahlmeister’s appointment underscores Altwy’s commitment to building a strong leadership team equipped to navigate the complexities of the evolving IT landscape.`,
	},
	{
		id: 1,
		date: "Nov 2024",
		title: "Altwy at Slush 2024",
		contentType: "text",
		content: `This week will start **Slush2024** in *Helsinki*, a 2 days of VC/Startups meetings but a full week of networking !
Our CEO will be there from *Nov 17th to 24th*.
If you are a VC and want to **invest** in one of the most promising startup, feel free to meet him at Slush or during the week !`,
	},
	{
		id: 2,
		date: "Nov 2024",
		title: "Altwy unveiled its new website : www.altwy.com",
		contentType: "text",
		content: `Altwy launches its **__new website__**. Much more **professional and dynamic**, it reflects the company's identity in its fight for more **efficient** and **lower-consumption datacenters**.
"We are very proud and very happy about this new website. A new step in our corporate communication." - *Christophe Lambert - CEO Altwy*`,
	},
	{
		id: 3,
		date: "Oct 2024",
		title: "Will new Data Centers be seen as a problem going forward or will mankind understand how to make existing ones more efficient ?",
		contentType: "text",
		content: `**__The Rise of Data Centers: A Necessity Amid Controversy__**
Data centers, the essential backbone of our digital world and the booming artificial intelligence (AI) industry, are proliferating rapidly. However, their exponential growth is raising significant concerns regarding their energy consumption, environmental impact, and the strain they place on local communities.

**__Why It Matters__**
In the United States, there are more than **5,000 data centers**, which consume massive amounts of energy and occupy vast areas of land. In Europe, while fewer in number, data centers are also multiplying rapidly, particularly in France, Germany, the Netherlands, and the Nordic countries. These installations are critical for running the internet, AI, and cloud services, and are often backed by generous tax and energy incentives. However, their energy footprint is becoming a major source of contention.

**__The U.S. Case__**
The **United States**, as the global epicenter of data centers, continues to see rapid expansion of these facilities. According to **CBRE** (a leading real estate services company), investments in data centers exceeded **$35 billion** in 2022, with growth projected to continue at a double-digit rate. **Northern Virginia** remains the world's largest data center hub, hosting over 160 operational centers.

A key issue in the U.S. is energy demand. According to a **2023 Grid Strategies report**, U.S. data centers will require nearly **40 additional gigawatts** of electricity by 2028, nearly double previous estimates. This alarming figure reflects the growing pressure on the U.S. power grid, particularly in states like **Texas**, where electricity consumption is rising rapidly. In **Northern Virginia**, data centers now account for **20%** of the state's electricity consumption, a percentage that continues to grow.

**__Controversial Projects__**
Virginia serves as a prime example. In 2022, a massive data center project in **Prince William County** sparked fierce opposition from residents. A **27-hour** marathon meeting was required to approve the project, which is now being contested in court by locals who argue it will lower property values and create significant noise pollution. In Columbus, Ohio, **Microsoft** secured a full tax exemption on a **$420 million** data center investment, but the long-term economic impact for the community is minimal, with only **30 jobs** created.

**__The European Case__**
In Europe, data centers are also expanding rapidly but face a different set of pressures due to stringent climate goals. **The European Union** has set ambitious targets for reducing carbon emissions through the **Green Deal**, which imposes stricter standards on data centers in terms of energy consumption and the use of renewable energy.

**__Key European Statistics__**
In 2022, Europe had around **4,500 data centers**, concentrated in countries like Germany, France, the Netherlands, and the Nordic countries. **Germany** hosts around **10%** of Europe's data centers, while the **Netherlands** accounts for **8%**. **The Nordic countries** (Sweden, Norway, Finland) are increasingly prominent due to their ability to leverage renewable energy sources to power data centers.

• In 2023, a study by the Shift Project estimated that European data centers consume approximately 90 TWh of electricity annually, accounting for nearly 3% of the EU’s total electricity consumption.

In **France**, the electricity consumption of data centers in 2020 was around **10 TWh** per year, representing about **2%** of the country's total electricity use. This figure could triple by 2030, according to **Ademe**.

**__European Initiatives to Reduce Energy Impact__**
Countries like **Sweden** and **Norway** have taken a proactive approach by using green energy to attract data centers. For example, data centers in **Norway** run largely on **hydropower**, which supplies around **98%** of the country’s electricity. This allows tech giants like **Microsoft** and **Google** to establish operations there while adhering to strict sustainability requirements.

In **Sweden, Stockholm Data Parks** has developed an innovative project where residual heat from data centers is used to heat residential buildings, creating a circular economy model that reduces overall energy consumption. Data centers in these parks feed energy back into the district heating network, allowing the city to reduce its carbon footprint while providing essential digital services.

**__Local Impact and Opposition__**
Like in the U.S., European data centers face growing opposition due to their impact on the power grid and local communities.

**__France: Growing Tensions__**
In France, regions like Île-de-France and Bouches-du-Rhône, where many data centers are concentrated, are facing increasing pressure on land availability and power grids. For example, the **Aix-Marseille** metro area, which has become a significant digital hub thanks to its undersea cable connections, is attracting more data centers, but this presents challenges for urban planning and energy management.

The **RE2020** law in France now mandates that data centers limit their carbon footprint. These facilities must use at least **30% renewable energy** and meet stricter energy efficiency (PUE) requirements to comply with the country’s goal of carbon neutrality by **2050**. However, these requirements raise costs and spark debates about balancing economic performance with sustainability.

**__Germany: Frankfurt Under Pressure__**
**Frankfurt**, Europe’s data center capital, is home to over **60 facilities** and consumes more than **20%** of the region’s electricity. The city is facing significant criticism, particularly regarding the impact of these centers on land prices and their heavy use of water for cooling. In 2023, residents launched several petitions to stop the construction of new centers in residential areas, calling for more sustainable solutions and better distribution of infrastructure across the country.

**__Tax Incentives and Controversies__**
In both the U.S. and Europe, data centers continue to receive substantial support through tax incentives. In the U.S., **30 states** have passed legislation offering property tax abatements and other financial incentives to companies building data centers, often in the form of sales tax credits or equipment tax breaks.

In **Europe**, countries like **Ireland** are known for their highly favorable tax policies. Irish data centers, which account for about **25%** of the country’s electricity consumption, benefit from attractive fiscal incentives despite growing concerns about national energy resources.

**__Conclusion__** 
If we want to avoid these ongoing data center crises, we need to think differently and consider whether it's time to **make existing data centers more efficient** by rethinking their renewal now. 

They're filled with servers powered by processors that were efficient 20 or 25 years ago. Today, much more efficient servers exist, and **Altwy** not only enables the full utilization of these new resources while allowing for a smooth transition from the current infrastructure to the future of the Cloud, but also supports you and your company to **reach your #ESG goals!**

*Christophe Lambert - CEO Altwy*



Learn more about **Altwy** : 

• The challenge of data center efficiency: https://youtu.be/XumN1bnpCGE 
• The future of hypervisors: https://youtu.be/u0YKClDnWOc
• And one in French : https://youtu.be/dtseWsMaTH4`,
	},
	{
		id: 4,
		date: "Oct 2024",
		title: "It's time to change !",
		contentType: "text",
		content: `Data centers, the backbone of the digital economy, have become massive energy consumers. According to a study by the **Electric Power Research Institute (EPRI)**, data centers could account for up to *9% of U.S. electricity consumption by 2030*. To address this growing demand, companies have turned to solutions like water cooling. For instance, Cloud Giants draws millions of liters of water from aquifers and rivers to cool their infrastructure. However, this method is far from environmentally friendly, depleting water resources and threatening local ecosystems.

Simultaneously, power grids are becoming overloaded. Electrical lines are struggling to keep up with demand, especially with the surge in AI-related projects. A **"The Wall Street Journal"** article from September 28, 2024, reports that **U.S. data centers now consume three times the electricity capacity of New York City.** Electric utilities are faced with difficult decisions: modernize infrastructure to meet demand at an enormous cost. In some regions, like Salt Lake City, data center projects have been temporarily halted due to a lack of transmission capacity.

The use of data centers as heat sources to warm water tanks in some countries is another example of inefficient resource management. While this solution may seem innovative, it is, in fact, ineffective and counterproductive. It is absurd to use such complex and energy-intensive infrastructures for such trivial purposes. *A datacenter is not a radiator.*

Some companies are exploring extreme solutions, such as placing data centers underwater or in the Arctic Circle to take advantage of natural cooling. However, these initiatives only shift the problem elsewhere. They introduce new logistical challenges while continuing to pollute and disrupt the environment. The underwater networks, grids and infrastructure required for these operations only exacerbate the environmental footprint of such projects.

In this context, venture capital (VC) firms continue to invest heavily in AI-related startups, even though delays in infrastructure deployment due to energy issues can extend over several years. These delays often compromise the short-term profitability of such investments, as startups struggle to deploy their projects quickly enough to repay VCs.

So why continue to invest in these energy-hungry startups, rather than focusing on those that offer solutions to reduce the environmental impact of data centers? As I often say: **" It's always time to tackle the causes rather than the consequences ! "**. One of the major causes is the excessive power consumption of processors used in data centers, like Intel chips, which consume a lot of energy and produce significant heat.

A shift in paradigm is necessary. In this regard, **Apple** has set an example by replacing all Intel processors in its machines with modern processors that incorporate AI functionalities. These faster, more efficient systems have significantly reduced power consumption, and most importantly, they do not overheat. They no longer require fans, relying instead on simple passive radiators for cooling.

This transition perfectly illustrates the direction that also data centers should follow. An innovative solution is offered by the startup Altwy, which has developed a cloud management software tailored for data centers. This software optimizes resource management by leveraging modern, energy-efficient, and “cool“-running processors. Investing in Altwy means giving data centers the ability to reduce both their energy and environmental costs, while providing a platform that is simple to manage and administer.

In conclusion, rather than continuing to seek expensive and ineffective solutions to address the symptoms of the data center energy crisis, it is essential to address the root cause. Investing in more efficient and environmentally friendly technologies, like those proposed by **Altwy**, would provide a truly sustainable long-term solution.



*Christophe Lambert*

*CEO Altwy*



**Sources : The Wall Street Journal EPRI Apple Arm RISC-V International **

#GreenIT #VC`,
	},
	{
		id: 5,
		date: "Aug 2024",
		title: "France2030 invested into Altwy - August 2024",
		contentType: "text",
		content: `I'm very proud to announce that a part of our **R&D** at **__Altwy__** was possible because of subvention from **Bpifrance (the French Banque of Investment, property of the République française).**
To create multiple tools to make our Planet **greener** and our Datacenter **more efficient**, finances are key. **Bpifrance** and the **République française** invested into **our vision** to make a part of our technology available ! 
Today a major step is achieved and we are building the next chapter !
Here 2 videos in English about Altwy :
• https://lnkd.in/dS7TfkgP 
• https://lnkd.in/dFYvABYd
Feel free to subscribe to our page : https://lnkd.in/d6Pr3PSn`,
	},
	{
		id: 6,
		date: "July 2024",
		title: "First video of Altwy in French !",
		contentType: "video",
		content: "https://www.youtube.com/embed/dtseWsMaTH4",
	},
	{
		id: 7,
		date: "March 2024",
		title: "Altwy : The Challenge of Data Center Efficiency",
		contentType: "video",
		content: "https://www.youtube.com/embed/XumN1bnpCGE",
	},
	{
		id: 8,
		date: "Feb 2024",
		title: "The Heat: How ARM Processors and Altwy Hypervisor Can Cool Down Your Datacenter",
		contentType: "text",
		content: `**__Introduction:__**
Welcome, data center enthusiasts! Today, we're going to tackle a hot topic - literally. Yes, we're talking about the fatal heat that can plague your data center and turn it into a sauna. But fear not, because there is a cool solution on the horizon. By harnessing the power of ARM or RISC-V processors and utilizing the innovative Altwy hypervisor, you can finally say goodbye to the heat and hello to optimal performance. So, sit back, relax, and let's dive into how you can transform your data center into a cool oasis of efficiency.

**__1: The Heat is On__**
Ah, the dreaded fatal heat that lurks in every data center. It's like a relentless enemy that constantly threatens to bring your operations to a screeching halt. With traditional Intel processors churning away, the heat can quickly spiral out of control, turning your once-efficient data center into a veritable oven. But fear not, for there is a light at the end of the tunnel.

**__2: ARM to the Rescue__**
Enter ARM processors, the unsung heroes of the data center world. These power-efficient chips are like a breath of fresh air in a stifling room. By switching to ARM architecture, you can significantly reduce the heat generated in your data center, creating a much cooler and more sustainable environment for your operations. It's like swapping out a roaring fireplace for a gentle breeze - the difference is truly night and day.

**__3: Altwy: The Cool Hypervisor__**
But wait, there's more! The secret weapon in your quest to beat the heat is none other than Altwy, the innovative hypervisor that is taking the data center world by storm. By leveraging the unique capabilities of Altwy, you can unlock the full potential of your ARM processors and maximize their cooling benefits. It's like having a personal air conditioner for your data center, ensuring that your operations stay cool, calm, and collected at all times.

**__4: Data Center or Sauna?__**
Let's face it - a data center is not a heater, it's a provider of vital data and applications that drive your business forward. So why settle for a sweltering sauna when you could have a perfectly cool and efficient data center instead? With the right tools and technology at your disposal, you can transform your data center from a heat trap into a well-oiled machine that delivers results day in and day out.

**__5: The Power of Choice__**
When it comes to processors, you have a choice - do you stick with the status quo and continue to generate excessive heat with traditional Intel chips, or do you embrace the future with ARM processors that offer unparalleled efficiency and cooling benefits? The choice is clear, and the benefits are undeniable. By making the switch to ARM, you can future-proof your data center and ensure that it operates at peak performance without breaking a sweat.

**__6: Efficiency is Key__**
At the end of the day, it all comes down to efficiency. A data center that is bogged down by heat is like a car running on empty - it's only a matter of time before it grinds to a halt. By optimizing your data center with ARM processors and the Altwy hypervisor, you can ensure that your operations run smoothly and efficiently, with minimal heat and maximum performance. It's a win-win situation that benefits both your bottom line and the environment.

**__7: Beyond the Basics__**
But the benefits don't stop there. With ARM processors and Altwy at your disposal, you can take your data center to new heights of innovation and productivity. Imagine a world where your operations are faster, more secure, and more cost-effective than ever before. That's the power of ARM and Altwy working in perfect harmony, creating a data center that is truly a force to be reckoned with.

**__8: Embracing the Future__**
In today's fast-paced digital landscape, the only constant is change. If you want your data center to stay ahead of the curve and remain competitive in the long run, then it's time to embrace the future with ARM processors and Altwy. Don't let fatal heat be the downfall of your operations - take control of your data center's destiny and unlock its full potential with the latest and greatest in processor technology.

**__9: Cool Down, Power Up__**
So, there you have it - the key to cooling down your data center and powering up your operations lies in the transformative power of ARM processors and the innovative Altwy hypervisor. Say goodbye to fatal heat and hello to a future of efficiency, sustainability, and success. Your data center is not a heater, it's a powerhouse of potential waiting to be unleashed. With ARM and Altwy on your side, the sky's the limit - so why wait? Cool down, power up, and let your data center shine.

**__10: The Bottom Line__**
In conclusion, fatal heat may be a common problem in data centers, but it doesn't have to be a fatality. By embracing ARM processors and leveraging the capabilities of the Altwy hypervisor, you can dramatically reduce the heat in your data center and unlock a world of performance benefits. Your data center is not a heater - it's a data and application provider that deserves to operate at the highest levels of efficiency. So, take the leap, make the switch, and watch as your data center transforms into a cool oasis of productivity. The future is here, and it's cooler than ever before.`,
	},
	{
		id: 9,
		date: "Jan 2024",
		title: "Altwy: The Future of Hypervisors",
		contentType: "video",
		content: "https://www.youtube.com/embed/u0YKClDnWOc",
	},
	{
		id: 10,
		date: "Dec 2023",
		title: `Mutualisation des ressources numériques responsables - Push Start x AD'OCC`,
		contentType: "video",
		content: "https://www.youtube.com/embed/akckj-EGCa8",
	},
]

const formatText = (text: string) => {
	const parts = text.split(/(\*\*.*?\*\*|\*.*?\*|__.*?__)/g);
	return parts.map((part, index) => {
		if (part.startsWith('**') && part.endsWith('**')) {
			return <strong key={index}>{formatText(part.slice(2, -2))}</strong>;
		} else if (part.startsWith('*') && part.endsWith('*')) {
			return <em key={index}>{formatText(part.slice(1, -1))}</em>;
		} else if (part.startsWith('__') && part.endsWith('__')) {
			return <span key={index} className="text-lg">{formatText(part.slice(2, -2))}</span>;
		}
		return part;
	});
};

export default function NewsPage() {
	const [scrollY, setScrollY] = useState(0)
	const [menuOpen, setMenuOpen] = useState(false)
	const [expandedItems, setExpandedItems] = useState<number[]>([])
	const [ref, inView] = useInView({ triggerOnce: true })

	useEffect(() => {
		const handleScroll = () => setScrollY(window.scrollY)
		window.addEventListener("scroll", handleScroll)
		return () => window.removeEventListener("scroll", handleScroll)
	}, [])

	const toggleExpand = (id: number) => {
		setExpandedItems(prev => {
			const item = newsItems.find(item => item.id === id);
			if (item && item.contentType === "video") {
				return prev.includes(id) ? prev : [...prev, id];
			}
			return prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id];
		});
	};

	const fadeInUpVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
	}

	const staggerContainer = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1
			}
		}
	}

	return (
		<div className={`min-h-screen bg-gradient-to-br from-[#164C4C] to-[#1a3b3b] relative pb-24 ${inter.className}`}>

			{/* Naavbar */}
			<nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrollY > 50 ? 'bg-[#164C4C]/90 backdrop-blur-md' : ''}`}>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-between h-16">
						<div className="flex items-center">
							<Link href="/" className="flex-shrink-0">
								<Image
									src="/logo.png"
									alt="Logo"
									width={40}
									height={40}
									className="w-10 h-10"
								/>
							</Link>
						</div>
						<div className="hidden md:flex items-center space-x-4">
							<Link href="/" className="text-white hover:bg-[#57e4c5]/10 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
							<Link href="/company" className="text-white hover:bg-[#57e4c5]/10 px-3 py-2 rounded-md text-sm font-medium">Company</Link>
							<Link href="/news" className="text-white hover:bg-[#57e4c5]/10 px-3 py-2 rounded-md text-sm font-medium">News</Link>
							<Link href="/contact" className="text-white hover:bg-[#57e4c5]/10 px-3 py-2 rounded-md text-sm font-medium">Contact</Link>
						</div>
						<div className="md:hidden">
							<button
								onClick={() => setMenuOpen(!menuOpen)}
								className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-[#57e4c5]/10"
							>
								<Menu className="h-6 w-6" />
							</button>
						</div>
					</div>
				</div>
				{menuOpen && (
					<div className="md:hidden bg-[#164C4C]/95 backdrop-blur-md">
						<div className="px-2 pt-2 pb-3 space-y-1">
							<Link href="/" className="text-white hover:bg-[#57e4c5]/10 block px-3 py-2 rounded-md text-base font-medium">Home</Link>
							<Link href="/company" className="text-white hover:bg-[#57e4c5]/10 block px-3 py-2 rounded-md text-base font-medium">Company</Link>
							<Link href="/news" className="text-white hover:bg-[#57e4c5]/10 block px-3 py-2 rounded-md text-base font-medium">News</Link>
							<Link href="/contact" className="text-white hover:bg-[#57e4c5]/10 block px-3 py-2 rounded-md text-base font-medium">Contact</Link>
						</div>
					</div>
				)}
			</nav>

			{/* Main content */}
			<main className="pt-24 px-4 max-w-4xl mx-auto relative pb-24">
				{/* hEADER */}
				<motion.div
					initial="hidden"
					animate="visible"
					variants={fadeInUpVariants}
					className="text-center mb-12 relative"
				>
					<motion.div
						className="inline-flex items-center gap-2 bg-[#57e4c5]/20 rounded-full px-4 py-1 mb-4"
						variants={fadeInUpVariants}
					>
						<span className="text-[#57e4c5] text-sm font-medium">What's New</span>
					</motion.div>
					<motion.h1
						className="text-4xl md:text-5xl font-bold text-white mb-4 relative z-10"
						variants={fadeInUpVariants}
					>
						News & Updates
					</motion.h1>
					<motion.p
						className="text-white/70 text-lg max-w-2xl mx-auto relative z-10"
						variants={fadeInUpVariants}
					>
						Stay informed about our latest news.
					</motion.p>
					{/* Halo effect*/}
					<div className="absolute inset-0 bg-[#57e4c5] opacity-20 filter blur-3xl rounded-full"></div>
				</motion.div>

				{/* News feed */}
				<motion.div
					ref={ref}
					initial="hidden"
					animate={inView ? "visible" : "hidden"}
					variants={staggerContainer}
					className="space-y-12 relative"
				>
					{newsItems.map((item) => (
						<motion.div
							key={item.id}
							variants={fadeInUpVariants}
							className="bg-white/5 backdrop-blur-sm rounded-xl p-6 hover:bg-white/10 transition-all duration-300 border border-[#57e4c5]/20 shadow-lg hover:shadow-[#57e4c5]/10 relative overflow-hidden group"
						>
							<div className="space-y-4 relative z-10">
								<div className="flex items-center justify-between">
									<div className="bg-[#57e4c5]/20 text-[#57e4c5] px-3 py-1 rounded-full text-sm font-medium">
										{item.date}
									</div>
									{item.contentType === "text" && (
										<motion.div
											className="flex items-center gap-2 text-[#57e4c5] text-sm cursor-pointer"
											whileHover={{ scale: 1.05 }}
											whileTap={{ scale: 0.95 }}
											onClick={() => {
												if (!expandedItems.includes(item.id) && window.gtag) {
													window.gtag('event', 'see_more_button_news_page', {
														event_category: 'engagement',
														event_label: 'User clicked on See more button on a news',
													});
												}
												toggleExpand(item.id);
											}}
										>
											{expandedItems.includes(item.id) ? (
												<>
													<span>See less</span>
													<ChevronUp className="w-4 h-4" />
												</>
											) : (
												<>
													<span>See more</span>
													<ChevronDown className="w-4 h-4" />
												</>
											)}
										</motion.div>
									)}
								</div>
								<h3 className="text-2xl font-semibold text-white">
									{item.title}
								</h3>
								<AnimatePresence>
									<motion.div
										initial={{ height: 0, opacity: 0 }}
										animate={{
											height: expandedItems.includes(item.id) || item.contentType === "video" ? "auto" : "80px",
											opacity: 1
										}}
										exit={{ height: 0, opacity: 0 }}
										transition={{ duration: 0.3 }}
										className="overflow-hidden"
									>
										{item.contentType === "text" ? (
											<div className="text-white/70 whitespace-pre-wrap">
												{formatText(item.content)}
											</div>
										) : (
											<div className="aspect-video relative mt-4">
												<iframe
													src={item.content}
													title={item.title}
													allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
													allowFullScreen
													className="absolute inset-0 w-full h-full rounded-lg"
												/>
											</div>
										)}
									</motion.div>
								</AnimatePresence>
							</div>
							{/* Glowing border effect */}
							<div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#57e4c5]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
						</motion.div>
					))}
				</motion.div>
			</main>
		</div>
	)
}