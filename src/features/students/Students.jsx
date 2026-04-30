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
  name: `Student Name ${i + 1}`,
  initials: `S${i+1}`,
  classSec: `Grade 10 - A`,
  guardian: `Guardian Name`,
  status: i % 4 === 0 ? 'inactive' : 'active'
}));

const Students = () => {
  const [data] = useState(MOCK_STUDENTS);

  const columns = [
    { 
      header: 'Student Name', 
      accessor: 'name',
      cell: (row) => (
        <div className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-sky-500 text-xs font-bold text-white shadow-sm ring-2 ring-white dark:ring-slate-900 group-hover:scale-110 transition-transform duration-300">
            {row.initials}
          </div>
          <div className="font-semibold text-slate-900 dark:text-slate-200 group-hover:text-indigo-600 transition-colors">
            {row.name}
            <div className="text-[10px] text-slate-500 dark:text-slate-400 font-normal uppercase tracking-wider mt-0.5">ID: {row.id}</div>
          </div>
        </div>
      )
    },
    { header: 'Class / Sec', accessor: 'classSec', cell: (row) => <span className="font-medium text-slate-600 dark:text-slate-300">{row.classSec}</span> },
    { header: 'Guardian', accessor: 'guardian', cell: (row) => <span className="text-slate-500 dark:text-slate-400">{row.guardian}</span> },
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
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <PageHeader
        title="Students Directory"
        breadcrumbs={[{ label: 'Directory' }, { label: 'Students', href: '/students' }]}
        actions={
          <Button onClick={() => handleAction('New Admission')} className="shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all">
            <Plus className="mr-2 h-4 w-4" /> New Admission
          </Button>
        }
      />
      
      <div className="bg-white dark:bg-slate-900/50 rounded-2xl border border-slate-200/60 dark:border-slate-800 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-sm overflow-hidden">
        <DataTable 
          data={data} 
          columns={columns} 
          searchPlaceholder="Search by student name or ID..."
          onView={() => handleAction('View')}
          onEdit={() => handleAction('Edit')}
          onDelete={() => handleAction('Delete')}
        />
      </div>
    </div>
  );
};

export default Students;
