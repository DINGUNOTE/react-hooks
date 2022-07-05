import { useInput, useTabs } from './Hooks';

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
    </>
  );
};
export default App;
