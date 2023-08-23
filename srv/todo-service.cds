using { sap.ui.todomanagement as my } from '../db/schema-todos';

@path: 'service/todo'
service TodoService {
  entity Todos as projection on my.Todos;
    annotate Todos with @odata.draft.enabled;
}