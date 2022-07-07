import {
  useClick,
  useConfirm,
  useInput,
  usePreventLeave,
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
    </>
  );
};
export default App;
