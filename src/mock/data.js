export const blog = {
  info: {
    name: 'Another Blog',
    author: 'Someone'
  },
  menu: [
    {
      id: 'aa',
      label: 'Home',
      link: '#'
    },
    {
      id: 'bb',
      label: 'Archive',
      link: '#'
    },
    {
      id: 'cc',
      label: 'About',
      link: '#'
    },
    {
      id: 'dd',
      label: 'RSS',
      link: '#'
    }
  ],
  categories: [
    {
      id: 'aaa',
      label: 'Devlopment'
    },
    {
      id: 'bbb',
      label: 'Life'
    },
    {
      id: 'ccc',
      label: 'Game'
    },
    {
      id: 'ddd',
      label: 'Study'
    },
    {
      id: 'eee',
      label: 'Recommend'
    }
  ],
  posts: [
    {
      id: 'aaaa',
      title: 'Test Blog A',
      createTime: '2019-01-09 17:38',
      postTime: '2019-01-09 17:39',
      updateTime: '2019-01-09 17:40',
      content: '# This is title\n\nhello **blog** again!\n\n## List\n\n- list item A\n- list item B\n- list item C\n',
      categories: ['aaa', 'ccc'],
      tags: ['greeting', 'test']
    },
    {
      id: 'bbbb',
      title: 'Test Blog B',
      createTime: '2019-01-09 17:38',
      postTime: '2019-01-09 17:39',
      updateTime: '2019-01-09 17:40',
      content: 'Hello, world.\n\n```js\ntest();\n```',
      categories: ['bbb', 'ddd'],
      tags: ['greeting', 'test']
    },
    {
      id: 'cccc',
      title: 'Test Blog C',
      createTime: '2019-01-09 17:38',
      postTime: '2019-01-09 17:39',
      updateTime: '2019-01-09 17:40',
      content: 'Hello, world. Are you O.K.?',
      categories: ['aaa', 'eee'],
      tags: ['greeting', 'test']
    }
  ]
}
