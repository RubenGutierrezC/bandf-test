import { useEffect } from "react";
import { useState } from "react";
import { AiOutlineSearch, AiFillYoutube, AiOutlineMenu, AiFillHome } from "react-icons/ai";
import { HiMicrophone } from 'react-icons/hi'
import {MdOutlineExplore, MdLocalPlay, MdVideoLibrary, MdMoreVert} from 'react-icons/md'
import { useMediaQuery } from 'react-responsive'
import {BsFillCollectionPlayFill } from 'react-icons/bs'
import {  GiBackwardTime} from 'react-icons/gi'
import { FaRegUserCircle} from 'react-icons/fa'

const leftIconsProps = {

}

const leftMenuOptions = [
  {
    name: "Inicio",
    icon: <AiFillHome {...leftIconsProps} />,
  },
  {
    name: "Explorar",
    icon: <MdOutlineExplore />,
  },
  {
    name: "shorts",
    icon: <MdLocalPlay />,
  },
  {
    name: "Suscripciones",
    icon: <BsFillCollectionPlayFill />,
  },
  {
    name: "Biblioteca",
    icon: <MdVideoLibrary />,
  },
  {
    name: "Historial",
    icon: <GiBackwardTime  />,
  },
];

function App() {
  const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' })

  const [videos, setVideos] = useState([])

  const [isOpenLeftPanel, setIsOpenLeftPanel] = useState(false)

  const togglePanel = () => setIsOpenLeftPanel(!isOpenLeftPanel)

  useEffect(() => {
    (async () => {

      try {
        const response = await fetch('http://localhost:5000')
        const data = await response.json()
  
        if (data?.length > 0) {
          const videos = data.map(mov => ({
            id: mov[0],
            thumbnail: mov[1],
            title: mov[2],
            channel: mov[3],
            views: mov[4],
            url: mov[5]
          }))
          setVideos(videos || [])
        }

      } catch (error) {
        console.error(error)
      }

    })()

  }, [])
  

  return (
    <div className="App">
      <header className="flex justify-between pt-3 px-5 sticky top-0 bg-[#212121fa] items-center" >
        <div className="flex items-center gap-2">
          <AiOutlineMenu className="md-hidden cursor-pointer hover:bg-slate-50 hover:bg-opacity-40" color="white" size={25} onClick={togglePanel} />
          <AiFillYoutube size={40} color="red" />
          <p className="text-white font-bold text-lg ">Youtube</p>
        </div>

        <div className="hidden md:flex">
          
          <input className="border-2 border-gray-600 py-1 px-2 bg-[#121212] text-white hover:border-blue-700 focus:border-blue-700 outline-none" placeholder="Buscar" />
          <button className="bg-[#303030] py-2 px-5 h-auto">
            <AiOutlineSearch color='white' size={25} />
          </button>
          <button className="h-auto px-5 py-2">
            <HiMicrophone color="white"  size={25} />
          </button>
        </div>

        <div className="flex gap-5 items-center text-white">
          <MdMoreVert size={30} />
          <button className="flex border-2 border-blue-700 items-center gap-3 px-3 py-2 uppercase text-blue-600 hover:bg-blue-500 hover:bg-opacity-30">
            <FaRegUserCircle size={20} />
            <span>inciar sesión</span>
          </button>
        </div>
      </header>

      <aside className={"fixed bg-[#212121fa] overflow-hidden " + `${isOpenLeftPanel || isDesktop ? 'w-60 h-full' : 'w-0 h-0'}`}>
        <ul className="space-y-2">
          {leftMenuOptions.map((opt, key) => (
            <a
              key={key}
              href="#"
              className="flex items-center p-2 text-base font-normal text-white rounded-lg  hover:bg-gray-100 hover:text-black"
            >
              {opt.icon}
              <span className="ml-3">{opt.name}</span>
            </a>
          ))}
        </ul>
      </aside>

      <main className="pt-10 px-2">
        <section className={"w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 mx-auto " + `${isDesktop ? 'pl-[240px]' : ''}`}>
          {videos.map((video) => (
            <a key={video.title} href={video.url || '#'}>
            <div className="py-2 px-1 mx-auto w-[inherit] max-w-[290px]">
              <img src={video.thumbnail} alt="video thumb" />
              <div className="">
                <p className="text-white truncate">{video.title}</p>
                <p className="text-gray-400">{video.channel}</p>
                <p className="text-gray-400">{video.views} Visualizaciones</p>
              </div>
            </div>

            </a>
          ))}
        </section>
      </main>
    </div>
  );
}

export default App;
