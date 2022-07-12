import {
  useAxios,
  useBeforeLeave,
  useClick,
  useConfirm,
  useFadeIn,
  useFullscreen,
  useInput,
  useNetwork,
  useNotification,
  usePreventLeave,
  useScroll,
  useTabs,
  useTitle,
} from './Hooks';

const content = [
  {
    tab: 'Section 1',
    content: "I'm the content of the Section 1",
  },
  {
    tab: 'Section 2',
    content: "I'm the content of the Section 2",
  },
];

const App = () => {
  // useInput
  const maxLength = value => value.length <= 10;
  const name = useInput('Mr.', maxLength);

  // useTabs
  const { currentItem, changeItem } = useTabs(0, content);

  // useTitle
  const titleUpdater = useTitle('Loading...');
  setTimeout(() => {
    titleUpdater('Home');
  }, 1000);

  // useClick
  const onClick = () => console.log('say hello');
  const title = useClick(onClick);

  // useConfirm
  const deleteWorld = () => console.log('Deleting the world...');
  const abort = () => console.log('Aborted');
  const confirmDelete = useConfirm('Are you sure', deleteWorld, abort);

  // usePreventLeave
  const { enablePrevent, disablePrevent } = usePreventLeave();

  // useBeforeLeave
  const begForLife = () => console.log('Pls dont leave');
  useBeforeLeave(begForLife);

  // useFadeIn
  const element1 = useFadeIn(2, 0.2, 'ease-out');
  const element2 = useFadeIn(2, 0.5);

  // useNetwork
  const handleNetworkChange = online => {
    console.log(online ? 'We just went online' : 'We are offline');
  };
  const onLine = useNetwork(handleNetworkChange);

  // useScroll
  const { y } = useScroll();

  // useFullscreen
  const { element, trigger, exitFull } = useFullscreen();

  // useNotification
  const triggerNotif = useNotification('Can I steal your kimchi?', {
    body: 'I love kimchi dont you',
  });

  // useAxios
  const { loading, data, reFetch } = useAxios({
    url: 'https://yts.mx/api/v2/list_movies.json',
  });

  return (
    <>
      <div className="useInput">
        <h1>Hello</h1>
        <input type="text" placeholder="Name" {...name} />
      </div>
      <div className="useTabs">
        {content.map((section, index) => (
          <button onClick={() => changeItem(index)} key={index}>
            {section.tab}
          </button>
        ))}
        <div>{currentItem.content}</div>
      </div>
      <div className="useClick">
        <h1 ref={title}>Hi</h1>
      </div>
      <div className="useConfirm">
        <button onClick={confirmDelete}>Delete the world</button>
      </div>
      <div className="usePreventLeave">
        <button onClick={enablePrevent}>Protect</button>
        <button onClick={disablePrevent}>Unprotect</button>
      </div>
      <div className="useFadeIn">
        <h1 {...element1}>HI</h1>
        <p {...element2}>lorem ipsum .......</p>
      </div>
      <div className="useNetwork">
        <h1>{onLine ? 'Online' : 'Offline'}</h1>
      </div>
      <div
        className="useScroll"
        style={
          {
            /* height: '1000vh' */
          }
        }
      >
        <h1 style={{ position: 'fixed', color: y > 100 ? 'red' : 'blue' }}>
          Hi
        </h1>
      </div>
      <div style={{ marginTop: '50px' }} className="useFullscreen">
        <div ref={element}>
          <img src="https://www.fillmurray.com/640/360" alt="" />
          <button onClick={exitFull}>Exit Fullscreen</button>
        </div>
        <button onClick={trigger}>Make Fullscreen</button>
      </div>
      <div className="useNotification">
        <button onClick={triggerNotif}>Hello</button>
      </div>
      <div className="useAxios">
        <h1>{data && data.status}</h1>
        <h2>{loading && 'Loading'}</h2>
        <button onClick={reFetch}>Refresh</button>
      </div>
    </>
  );
};
export default App;
