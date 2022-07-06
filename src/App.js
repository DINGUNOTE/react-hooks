import { useClick, useInput, useTabs, useTitle } from './Hooks';

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
  const maxLength = value => value.length <= 10;
  const name = useInput('Mr.', maxLength);
  const { currentItem, changeItem } = useTabs(0, content);
  const titleUpdater = useTitle('Loading...');
  setTimeout(() => {
    titleUpdater('Home');
  }, 1000);
  const onClick = () => console.log('say hello');
  const title = useClick(onClick);

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
    </>
  );
};
export default App;
