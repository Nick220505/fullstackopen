import Blog from './Blog';
import User from './User';
import Team from './Team';
import Membership from './Membership';
import ReadingList from './ReadingList';

User.hasMany(Blog);
Blog.belongsTo(User);

User.belongsToMany(Team, { through: Membership });
Team.belongsToMany(User, { through: Membership });

User.belongsToMany(Blog, { through: ReadingList, as: 'readings' });
Blog.belongsToMany(User, { through: ReadingList, as: 'marked_user' });

export { Blog, User, Team, Membership, ReadingList };
