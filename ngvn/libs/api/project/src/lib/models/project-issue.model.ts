import { BaseModel, useMongoosePlugin } from '@ngvn/api/common';
import { TimelineDto } from '@ngvn/api/dtos';
import { User } from '@ngvn/api/user';
import { ProjectIssuePriority, ProjectIssueStatus, ProjectIssueType } from '@ngvn/shared/project';
import { prop, Ref } from '@typegoose/typegoose';
import { AutoMap } from 'nestjsx-automapper';
import { ProjectIssueTag } from './project-issue-tag.model';
import { TimelineAssign } from './timeline-assign.model';
import { TimelineComment } from './timeline-comment.model';
import { TimelineMention } from './timeline-mention.model';
import { TimelineTag } from './timeline-tag.model';
import { Timeline } from './timeline.model';

@useMongoosePlugin()
export class ProjectIssue extends BaseModel {
  @prop({ required: true, index: true })
  @AutoMap()
  title: string;
  @prop({ default: '' })
  @AutoMap()
  bodyMarkdown: string;
  @prop({ default: '' })
  @AutoMap()
  outputHtml: string;
  @prop({ default: '' })
  @AutoMap()
  summary: string;
  @prop({ required: true })
  @AutoMap()
  ordinalPosition: string;
  @prop({ required: true, type: String, enum: ProjectIssueType })
  @AutoMap()
  type: ProjectIssueType;
  @prop({ required: true, type: String, enum: ProjectIssueStatus, default: ProjectIssueStatus.Backlog })
  @AutoMap()
  status: ProjectIssueStatus;
  @prop({ required: true, type: String, enum: ProjectIssuePriority, default: ProjectIssuePriority.Medium })
  @AutoMap()
  priority: ProjectIssuePriority;
  @prop({ type: () => ProjectIssueTag, default: [] })
  @AutoMap(() => ProjectIssueTag)
  tags: ProjectIssueTag[];
  @prop({ type: () => Timeline, discriminators: () => [TimelineAssign, TimelineComment, TimelineMention, TimelineTag] })
  @AutoMap(() => TimelineDto)
  timelineItems: (TimelineAssign | TimelineComment | TimelineMention | TimelineTag)[];
  @prop({ required: true, autopopulate: true, ref: () => User })
  @AutoMap(() => User)
  reporter: Ref<User>;
  @prop({ autopopulate: true, ref: () => User, default: null })
  @AutoMap(() => User)
  assignee: Ref<User>;
  @prop({ autopopulate: true, ref: () => User, default: [] })
  @AutoMap(() => User)
  participants: Ref<User>[];
}
