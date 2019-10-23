import { connect } from 'react-redux';
import SteedosDXGrid from './dx_grid';
import { createAction, loadEntitiesData } from '../../actions/views/dx_grid'
import { getEntityState } from '../../states';
// const mapStateToProps = (state: any) => state;

function mapStateToProps() {
  return (state: any, ownProps: any) => {
    let objectName = ownProps.objectName
    let entityState = getEntityState(state, objectName) || {}
    let pageSize = entityState.pageSize;
    if(!pageSize){
      pageSize = ownProps.pageSize || 10
    }
    return Object.assign(entityState, {...entityState, objectName, ...ownProps, pageSize});
  };
}

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
  onSortingChange: (sorting: any) => dispatch(createAction('sorting', sorting, ownProps.objectName)),
  onSelectionChange: (selection: any) => dispatch(createAction('selection', selection, ownProps.objectName)),
  onExpandedRowIdsChange: (expandedRowIds: any) => dispatch(createAction('expandedRowIds', expandedRowIds, ownProps.objectName)),
  onGroupingChange: (grouping: any) => dispatch(createAction('grouping', grouping, ownProps.objectName)),
  onExpandedGroupsChange: (expandedGroups: any) => dispatch(createAction('expandedGroups', expandedGroups, ownProps.objectName)),
  onFiltersChange: (filters: any) => dispatch(createAction('filters', filters, ownProps.objectName)),
  onCurrentPageChange: (currentPage: any) => dispatch(createAction('currentPage', currentPage, ownProps.objectName)),
  onPageSizeChange: (pageSize: any) => dispatch(createAction('pageSize', pageSize, ownProps.objectName)),
  onColumnOrderChange: (order: any) => dispatch(createAction('columnOrder', order, ownProps.objectName)),
  onColumnWidthsChange: (widths: any) => dispatch(createAction('columnWidths', widths, ownProps.objectName)),
  onSearchValueChange: (widths: any) => dispatch(createAction('searchValue', widths, ownProps.objectName)),
  init: (options: any) => dispatch(loadEntitiesData(options))
});

export default connect(mapStateToProps, mapDispatchToProps)(SteedosDXGrid);
