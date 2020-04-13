import WidgetObject from '../widget_object';
import WidgetConnect from './widget_connect';
import { getBetweenTimeBuiltinValueItem } from "@steedos/filters";
import { ComponentClass } from 'react';

// 简化组件时默认的标准配置
let config = {
  "workflow": {
      "label": "待审核文件",
      "position": "CENTER_TOP",
      "type": "object",
      "objectName": "instances",
      "filters": [
          [
              ["inbox_users", "=", "{userId}"], "or", ["cc_users", "=", "{userId}"]
          ]
      ],
      "sort": "modified desc",
      "columns": [{
          "label": "名称",
          "field": "name",
          "href": true
      }, {
          "label": "提交人",
          "field": "submitter_name",
          "width": "10rem"
      }, {
          "label": "修改时间",
          "field": "modified",
          "type": "datetime",
          "width": "10rem"
      }],
      "noHeader": false,
      "unborderedRow": true,
      "showAllLink": false,
      "illustration": {
          "messageBody": "您没有待审核文件"
      },
      rowIcon: {
          category: "standard",
          name: "task",
          size: "small"
      }
  },
  "announcements": {
      "label": "本周公告",
      "position": "CENTER_TOP",
      "type": "object",
      "objectName": "announcements",
      "filters": [
          ["owner", "=", "{userId}"],
          ["members", "=", "{userId}"],
          ['created', 'between', 'last_7_days']
      ],
      "sort": "created desc",
      "columns": [{
          "field": "name",
          "label": "标题",
          "href": true
      },{
          "field": "created",
          "label": "发布时间",
          "width": "10rem",
          "type": "datetime"
      }],
      "noHeader": false,
      "unborderedRow": true,
      "showAllLink": true,
      "illustration": {
          "messageBody": "本周没有新公告"
      },
      rowIcon: {
          category: "standard",
          name: "announcement",
          size: "small"
      }
  },
  "tasks": {
      "label": "今日任务",
      "position": "RIGHT",
      "type": "object",
      "objectName": "tasks",
      "filters": [
          ["assignees", "=", "{userId}"],
          ["state", "<>", "complete"],
          ['due_date', 'between', 'last_30_days']
      ],
      "sort": "due_date",
      "columns": [{
          "field": "name",
          "label": "主题",
          "href": true
      }],
      "unborderedRow": true,
      "showAllLink": true,
      "illustration": {
          "messageBody": "您今天没有待办任务"
      },
      "noHeader": true,
      rowIcon: {
          category: "standard",
          name: "timesheet_entry",
          size: "small"
      }
  },
  "calendar": {
      label: "今日日程",
      position: "RIGHT",
      type: "object",
      objectName: "events",
      filters: function(){
          let Creator = window.Creator;
          let utcOffset = Creator.USER_CONTEXT.user && Creator.USER_CONTEXT.user.utcOffset;
          let today = getBetweenTimeBuiltinValueItem("today", utcOffset);
          let start = today.values[0];
          let end = today.values[1];
          return [[
              ['owner', '=', '{userId}'], 
              'or', 
              ['assignees', '=', '{userId}']
          ], [
              ['end', '>=', start], 
              ['start', '<=', end]
          ]]
      },
      sort: "start desc, end",
      columns: [{
          field: "name",
          label: "主题",
          href: true
      }],
      unborderedRow: true,
      showAllLink: true,
      illustration:{
          messageBody: "您今天没有日程"
      },
      "noHeader": true,
      rowIcon: {
          category: "standard",
          name: "event",
          size: "small"
      }
  }
};

export const WidgetInstancesPendings:ComponentClass = WidgetConnect((props: any)=>{
  let adapted: any = {};
  if(props.position === "RIGHT"){
    adapted.columns = [{
      "label": "名称",
      "field": "name",
      "href": true
    }];
    adapted.noHeader = true;
  }
  return Object.assign({}, config.workflow, adapted, props);
})(WidgetObject);

WidgetInstancesPendings.displayName = "WidgetInstancesPendings";

export const WidgetAnnouncementsWeek:ComponentClass = WidgetConnect((props: any)=>{
  let adapted: any = {};
  if(props.position === "RIGHT"){
    adapted.columns = [{
      "field": "name",
      "label": "标题",
      "href": true
    }];
    adapted.noHeader = true;
  }
  return Object.assign({}, config.announcements, adapted, props);
})(WidgetObject);

WidgetAnnouncementsWeek.displayName = "WidgetAnnouncementsWeek";

export const WidgetTasksToday:ComponentClass = WidgetConnect((props: any)=>{
  let adapted: any = {};
  if(props.position !== "RIGHT"){
    adapted.columns = [{
      "field": "name",
      "label": "主题",
      "href": true
    }, {
      "field": "due_date",
      "label": "到期日期",
      "width": "10rem",
      "type": "date"
    }];
    adapted.noHeader = false;
  }
  return Object.assign({}, config.tasks, adapted, props);
})(WidgetObject);

WidgetTasksToday.displayName = "WidgetTasksToday";

export const WidgetEventsToday:ComponentClass = WidgetConnect((props: any)=>{
  let adapted: any = {};
  if(props.position !== "RIGHT"){
    adapted.columns = [{
      field: "name",
      label: "主题",
      href: true
    }, {
      "field": "start",
      "label": "开始时间",
      "width": "10rem",
      "type": "datetime"
    }];
    adapted.noHeader = false;
  }
  return Object.assign({}, config.calendar, adapted, props);
})(WidgetObject);

WidgetEventsToday.displayName = "WidgetEventsToday";

