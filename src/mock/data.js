export const blog = {
  info: {
    name: 'Another Blog',
    author: 'Someone'
  },
  menuItems: [
    {
      id: 'aa',
      label: 'Home',
      link: '/'
    },
    {
      id: 'bb',
      label: 'Archive',
      link: '/'
    },
    {
      id: 'cc',
      label: 'About',
      link: '/'
    }
  ],
  categories: [
    {
      id: 'aaa',
      label: 'Devlopment',
      postCount: 24
    },
    {
      id: 'bbb',
      label: 'Life',
      postCount: 15
    },
    {
      id: 'ccc',
      label: 'Game',
      postCount: 21
    },
    {
      id: 'ddd',
      label: 'Study',
      postCount: 10
    },
    {
      id: 'eee',
      label: 'Recommend',
      postCount: 38
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
  ],
  tags: [
    {
      id: 'tag-a',
      label: 'Docker',
      postCount: 18
    },
    {
      id: 'tag-b',
      label: 'React',
      postCount: 25
    },
    {
      id: 'tag-c',
      label: 'Angular',
      postCount: 21
    },
    {
      id: 'tag-d',
      label: 'Vue',
      postCount: 35
    },
    {
      id: 'tag-e',
      label: 'Visual Studio',
      postCount: 8
    },
    {
      id: 'tag-f',
      label: 'macOS',
      postCount: 10
    },
    {
      id: 'tag-g',
      label: 'iPhone',
      postCount: 23
    },
    {
      id: 'tag-h',
      label: 'Nintendo Switch',
      postCount: 64
    },
    {
      id: 'tag-i',
      label: 'Shanghai',
      postCount: 36
    },
    {
      id: 'tag-j',
      label: 'HTML/CSS',
      postCount: 64
    },
    {
      id: 'tag-k',
      label: 'NodeJS',
      postCount: 26
    },
    {
      id: 'tag-l',
      label: '.NET Core',
      postCount: 17
    },
    {
      id: 'tag-m',
      label: 'UI/UX',
      postCount: 22
    },
    {
      id: 'tag-n',
      label: 'Cthulhu',
      postCount: 38
    }
  ]
}
