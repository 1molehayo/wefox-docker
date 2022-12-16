interface sortState {
  label: string;
  dir: 'asc' | 'desc' | null;
  active: boolean;
}

export default sortState;
