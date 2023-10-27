export type TProfile = {
  id: string;
  name: string;
  image: string;
  email: string;
};
export enum MessageType {
  FriendRequest = "FRIEND_REQUEST",
  MeetingRequest = "MEETING_REQUEST",
  VisitNotification = "VISIT_NOTIFICATION",
}

export type TFriendRequestMessage = {
  id: string;
  type: MessageType.FriendRequest;
  fromUser: TProfile;
  text: "Friend Request!";
};
export type TVisitNotificationMessage = {
  id: string;
  type: MessageType.VisitNotification;
  fromUser: TProfile;
  text: "Coming by!";
  from: Date;
  to: Date;
};
export type TMeetingRequestMessage = {
  id: string;
  type: MessageType.MeetingRequest;
  fromUser: TProfile;
  text: "Wanna meet?";
  timestamp: Date;
};
export type TMessage = (
  | TFriendRequestMessage
  | TVisitNotificationMessage
  | TMeetingRequestMessage) & TRecord;


export function getMessageText(mType: MessageType): TMessage["text"] {
  if(mType===MessageType.FriendRequest)
    return "Friend Request!"
  if(mType===MessageType.MeetingRequest)
    return "Wanna meet?"
  if(mType===MessageType.VisitNotification)
    return "Coming by!";
  throw new Error("Given message type not included");
}

type TRecord = {
  createdAt: Date;
  updatedAt: Date;
}