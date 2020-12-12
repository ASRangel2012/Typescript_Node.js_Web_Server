
//gave up on the mongoDB with mongoose. Perhaps we can see where I went wrong later on if there is time! 
//create interface for typescript
/*interface I_userSchema {
  userId: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  password: string;
}

interface userModelInterface extends mongoose.Model<userDocument> {
  build(attr: I_userSchema): userDocument;
}

interface userDocument extends mongoose.Document {
  userId: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  password: string;
}

export const userSchema = new Schema({
  userId: {
    type: String,
    unique: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  emailAddress: {
    type: String,
    unique: true,
  },
  password: {
    type: String
  },
});

userSchema.statics.build = (attr: I_userSchema) => {
  return new User(attr);
};

const User = mongoose.model<userDocument, userModelInterface>(
  'User',
  userSchema
);

User.build({
  userId: '2',
  firstName: 'ange',
  lastName: 'test',
  emailAddress: 'asr@test.com',
  password: 'Abc234',
});


export { User };
*/