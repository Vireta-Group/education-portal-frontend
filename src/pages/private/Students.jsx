import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { PageHeader } from '../../components/common/PageHeader';
import { DataTable } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { toast } from 'sonner';

// Mock data
const MOCK_STUDENTS = Array.from({ length: 15 }).map((_, i) => ({
  id: `STU-2026-${(91 + i).toString().padStart(3, '0')}`,
  name: `John Smith ${i + 1}`,
  initials: `JS`,
  classSec: `Grade 10 - A`,
  guardian: `Sarah Smith`,
  status: i % 4 === 0 ? 'inactive' : 'active'
}));

const Students = () => {
  const [data] = useState(MOCK_STUDENTS);

  const columns = [
    { 
      header: 'Student Name', 
      accessor: 'name',
      cell: (row) => (
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white shadow-sm dark:bg-slate-50 dark:text-slate-900">
            {row.initials}
          </div>
          <div className="font-medium text-slate-900 dark:text-slate-200">{row.name}</div>
        </div>
      )
    },
    { header: 'ID Number', accessor: 'id', cell: (row) => <span className="font-medium text-slate-500">{row.id}</span> },
    { header: 'Class / Sec', accessor: 'classSec' },
    { header: 'Guardian', accessor: 'guardian' },
    { 
      header: 'Status', 
      accessor: 'status',
      cell: (row) => <StatusBadge status={row.status} />
    }
  ];

  const handleAction = (action) => {
    toast.info(`Action ${action} triggered! (Requires Backend Integration)`);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Directory / Students"
        breadcrumbs={[{ label: 'Directory' }, { label: 'Students', href: '/students' }]}
        actions={
          <Button onClick={() => handleAction('New Admission')}>
            <Plus className="mr-2 h-4 w-4" /> New Admission
          </Button>
        }
      />
      
      <DataTable 
        data={data} 
        columns={columns} 
        searchPlaceholder="Search by student name or ID..."
        onView={() => handleAction('View')}
        onEdit={() => handleAction('Edit')}
        onDelete={() => handleAction('Delete')}
      />
    </div>
  );
};

export default Students;
