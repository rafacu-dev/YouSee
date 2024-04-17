
import { ChangeEvent, useEffect, useState } from 'react'
import { getChannelId, getData } from './services';

function App() {
  const [channelId, setChannelId] = useState('maibless')
  const [bgImage, setBgImage] = useState('')
  const [nameChannel, setNameChannel] = useState('')
  const [subscribers, setSubscriber] = useState<number>(0)
  const [videos, setVideos] = useState<number>(0)
  const [views, setViews] = useState<number>(0)
  const [imageError, setImageError] = useState(false);

  const [loading, setLoading] = useState(true);
  
    useEffect(() => {
        window.scrollTo(0,0);

        setLoading(true)

        getChannelId(channelId) 
        .then(result => {
            
            setLoading(false)
            if(result === null) return
            getData(result)
            .then(data => {
                if(data === null) return
                setBgImage(data.snippet.thumbnails.high.url)
                setVideos(data.statistics.videoCount)
                setViews(data.statistics.viewCount)
                setSubscriber(data.statistics.subscriberCount)
                setNameChannel(data.snippet.title)
                
            })
            .catch((e) => { 
                console.log(e)
            })
        })
        .catch((e) => { 
            setLoading(false)
            console.log(e)
        })

    }, [channelId]);

    const onChangeNameChannel = (e: ChangeEvent<HTMLInputElement>) => setNameChannel(e.target.value.replace("@",""));
    const onChangeChannelId = () => setChannelId(nameChannel);
    
    useEffect(() => {
        const element = document.querySelector('.counter');
        if (element) {
            const endValue = parseInt(element.getAttribute('data-count') || '0', 0);
            const duration = endValue/10000;
            const range = endValue;
            let currentCount = 0;
            const stepTime = Math.abs(Math.floor(duration / range));
        
            const counterInterval = setInterval(() => {
                if (currentCount === endValue) {
                    element.textContent = currentCount.toString();
                    clearInterval(counterInterval);
                }
                else{
                    currentCount += 1;
                    element.textContent = currentCount.toString();
                }
            }, stepTime);
            return () => clearInterval(counterInterval);
        }
    }, [subscribers]);

    console.log(loading)
    return (
        <div className="min-h-screen bg-cover bg-center" style={{backgroundImage: `url(${bgImage})`}}>
            <div className="h-screen bg-black/90 flex flex-col bg-cover bg-center flex flex-cols items-center justify-center space-y-10"> 
                <h1 className="counter text-9xl font-black text-white" data-count={subscribers}></h1>

                <div className='flex items-center'>
                    
                    <img
                        className="w-16 h-16 p-1 rounded-full ring-2 ring-red-300 dark:ring-red-500 z-30"
                        src={bgImage}
                        alt="Bordered avatar"
                        />
                        
                    <input className="text-5xl font-serif italic text-white pl-10 -ml-6 w-72 lg:w-96 rounded-r-full
                    box-border outline-none shadow-medium rounded-large transition-transform-background motion-reduce:transition-none data-[pressed=true]:scale-[0.97] tap-highlight-transparent border-transparent 
                    bg-white/5 dark:bg-default-400/10 backdrop-blur-lg backdrop-saturate-[1.8] " onChange={onChangeNameChannel} value={`@${nameChannel}`}/>
                    <button onClick={onChangeChannelId} className="-ml-[3.25rem] rounded-full outline-none cursor-pointer border-transparent hover:bg-white/5 backdrop-blur-lg w-12 h-12 p-3" type="button" role="button">
                        {
                            loading?
                            <svg xmlns="http://www.w3.org/2000/svg" className='animate-spin w-full text-white' viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M7.706.29c-.222.072-.35.2-.412.409c-.035.117-.041.389-.041 1.809c0 1.881-.002 1.857.19 2.049c.257.256.857.256 1.114 0c.192-.192.19-.168.19-2.049c0-1.82-.003-1.852-.151-2.028C8.472.333 8.339.284 8.04.276a1.705 1.705 0 0 0-.334.014M2.753 2.266c-.158.072-.391.3-.472.462a.605.605 0 0 0-.012.525c.074.165 2.398 2.497 2.581 2.59c.259.133.525.068.793-.194c.264-.258.334-.538.2-.799c-.093-.183-2.425-2.507-2.59-2.581a.638.638 0 0 0-.5-.003m10.1.016c-.123.057-.333.254-1.335 1.259c-.921.923-1.202 1.221-1.247 1.319a.617.617 0 0 0 .001.518c.07.15.3.386.455.467c.157.082.39.081.553-.002c.167-.086 2.477-2.396 2.563-2.563a.648.648 0 0 0 .003-.551a1.26 1.26 0 0 0-.454-.446a.569.569 0 0 0-.539-.001M.699 7.292c-.295.093-.441.328-.441.707c.001.387.145.619.44.707c.118.035.381.041 1.81.041c1.489 0 1.688-.005 1.81-.045a.602.602 0 0 0 .384-.384c.086-.265.043-.641-.094-.827a.723.723 0 0 0-.191-.148l-.137-.076l-1.733-.006c-1.395-.004-1.756.002-1.848.031m11.046-.014a.757.757 0 0 0-.353.214c-.137.185-.18.561-.094.826c.058.18.204.326.384.384c.122.04.321.045 1.81.045c1.429 0 1.692-.006 1.81-.041c.295-.088.439-.32.44-.707c0-.385-.147-.616-.452-.708c-.103-.031-.426-.037-1.794-.035c-.918.002-1.706.012-1.751.022m-6.892 3.004c-.123.057-.333.254-1.335 1.259c-.921.923-1.202 1.221-1.247 1.319a.617.617 0 0 0 .001.518c.07.15.3.386.455.467c.157.082.39.081.553-.002c.167-.086 2.477-2.396 2.563-2.563a.648.648 0 0 0 .003-.551a1.26 1.26 0 0 0-.454-.446a.569.569 0 0 0-.539-.001m5.9-.016c-.158.072-.391.3-.472.462a.605.605 0 0 0-.012.525c.074.165 2.398 2.497 2.581 2.59c.259.133.525.068.793-.194c.264-.258.334-.538.2-.799c-.093-.183-2.425-2.507-2.59-2.581a.638.638 0 0 0-.5-.003m-3.008 1.011a.768.768 0 0 0-.353.215c-.138.186-.139.199-.139 1.997c0 1.432.006 1.695.041 1.813c.088.295.321.439.706.439c.385 0 .618-.144.706-.439c.062-.212.061-3.427-.002-3.612a.528.528 0 0 0-.284-.344c-.11-.06-.174-.075-.363-.082a1.537 1.537 0 0 0-.312.013"/></svg>
                            :<svg xmlns="http://www.w3.org/2000/svg" className='w-full text-white' viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21l-4.486-4.494M19 10.5a8.5 8.5 0 1 1-17 0a8.5 8.5 0 0 1 17 0Z"/></svg>
                    
                        }
                    </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl z-30">
                    <button className="flex flex-col relative rounded-xl overflow-hidden height-auto text-foreground box-border outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 shadow-medium rounded-large cursor-pointer transition-transform-background motion-reduce:transition-none data-[pressed=true]:scale-[0.97] tap-highlight-transparent border-transparent bg-white/5 dark:bg-default-400/10 backdrop-blur-lg backdrop-saturate-[1.8] px-6 py-3" type="button" role="button">
                        <div className="flex flex-col p-3 z-10 w-full justify-start items-center gap-2 pb-0">
                            <svg xmlns="http://www.w3.org/2000/svg"className="w-16 text-red-500" viewBox="0 0 256 256"><path fill="currentColor" d="m163.33 107l-48-32a6 6 0 0 0-9.33 5v64a6 6 0 0 0 9.33 5l48-32a6 6 0 0 0 0-10M118 132.79V91.21L149.18 112ZM216 42H40a14 14 0 0 0-14 14v112a14 14 0 0 0 14 14h176a14 14 0 0 0 14-14V56a14 14 0 0 0-14-14m2 126a2 2 0 0 1-2 2H40a2 2 0 0 1-2-2V56a2 2 0 0 1 2-2h176a2 2 0 0 1 2 2Zm12 40a6 6 0 0 1-6 6H32a6 6 0 0 1 0-12h192a6 6 0 0 1 6 6"/></svg>
                            <p className="text-normal font-black text-red-500">VIDEOS</p>
                        </div>
                        <h1 className="text-5xl font-black text-white text-center w-full py-3">{videos}</h1>
                    </button>
                    <button className="flex flex-col relative rounded-xl overflow-hidden height-auto text-foreground box-border outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 shadow-medium rounded-large cursor-pointer transition-transform-background motion-reduce:transition-none data-[pressed=true]:scale-[0.97] tap-highlight-transparent border-transparent bg-white/5 dark:bg-default-400/10 backdrop-blur-lg backdrop-saturate-[1.8] px-6 py-3" type="button" role="button">
                        <div className="flex flex-col p-3 z-10 w-full justify-start items-center gap-2 pb-0">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-16 text-red-500" viewBox="0 0 256 256"><path fill="currentColor" d="M164.38 181.1a52 52 0 1 0-72.76 0a75.89 75.89 0 0 0-30 28.89a12 12 0 0 0 20.78 12a53 53 0 0 1 91.22 0a12 12 0 1 0 20.78-12a75.89 75.89 0 0 0-30.02-28.89M100 144a28 28 0 1 1 28 28a28 28 0 0 1-28-28m147.21 9.59a12 12 0 0 1-16.81-2.39c-8.33-11.09-19.85-19.59-29.33-21.64a12 12 0 0 1-1.82-22.91a20 20 0 1 0-24.78-28.3a12 12 0 1 1-21-11.6a44 44 0 1 1 73.28 48.35a92.18 92.18 0 0 1 22.85 21.69a12 12 0 0 1-2.39 16.8m-192.28-24c-9.48 2.05-21 10.55-29.33 21.65a12 12 0 0 1-19.19-14.45a92.37 92.37 0 0 1 22.85-21.69a44 44 0 1 1 73.28-48.35a12 12 0 1 1-21 11.6a20 20 0 1 0-24.78 28.3a12 12 0 0 1-1.82 22.91Z"/></svg>
                            <p className="text-normal font-black text-red-500">VISTAS</p>
                        </div>
                        <h1 className="text-5xl font-black text-white text-center w-full py-3">{views}</h1>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default App
