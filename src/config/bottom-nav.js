const navButtonId = {
  userMenu : 'USER MENU',
  category : 'CATEGORY',
  tagsCloud: 'TAGS CLOUD',
  year: 'YEAR',
  month: 'MONTH'
}

const triggerButtonNav = (component, event) => {
  const { bottomNavId } = component.state;
  const eventId = event.currentTarget.id;
  const updatedId = bottomNavId === eventId ? '' : eventId;
  component.setState({
    bottomNavId: updatedId
  });
}

export {
  navButtonId,
  triggerButtonNav
}
